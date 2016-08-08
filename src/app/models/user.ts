import {cloneDeep, isEqual} from 'lodash';
import {ILogService, IHttpService, IPromise} from 'angular';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IUser {
  id: string;
  fullname: string;
  address: string;
}

export class UserService {
  constructor(
    private $http: IHttpService,
    private $log: ILogService,
    private localStorageService: ILocalStorageService
  ) {
    'ngInject';
  }

  me(): IUser {
    let me = this.localStorageService.get<IUser>('me');

    if (!me) {
      this.$log.info('UserService: No current user found in local storage. Create guest');

      this.localStorageService.set<IUser>('me', this.createGuest());
      me = this.localStorageService.get<IUser>('me');
    }

    return me;
  }

  isValid(user: IUser): boolean {
    return Boolean(user.fullname && user.address);
  }

  updateFullNameFor(user: IUser, name: string): IUser {
    return this.updateIn(user, 'fullname', name);
  }

  updateAddressFor(user: IUser, address: string): IUser {
    return this.updateIn(user, 'address', address);
  }

  update(user: IUser): IPromise<IUser> {
    return this.updateInDb(user).then(user => {
      this.storeToLocalStorage(user);

      return user;
    });
  }

  create(user: IUser): IPromise<IUser> {
    return this.createInDb(user).then(user => {
      this.storeToLocalStorage(user);

      return user;
    });
  }

  sync(user: IUser): IPromise<IUser> {
    if (!this.isValid(user)) {
      this.$log.warn('UserService:sync: User is not valid, skip sync', user);
      return;
    }

    return this.isGuest(user) ? this.create(user) : this.update(user);
  }

  createInDb(user: IUser): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const baseUrl = 'http://api.cogniance.lunches.com.ua/users';
    return this.$http.post<IUser>(baseUrl, user).then(res => res.data);
  }

  updateInDb(user: IUser): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const baseUrl = 'http://api.cogniance.lunches.com.ua/users';
    return this.$http.put<IUser>(baseUrl + '/' + user.fullname, user).then(res => res.data);
  }

  isEqual(user1: IUser, user2: IUser): boolean {
    return isEqual(user1, user2);
  }

  createGuest(): IUser {
    return {
      id: null,
      fullname: '',
      address: ''
    };
  }

  isGuest(user: IUser): boolean {
    return Boolean(!user.id);
  }

  searchUsersBy(name: string): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/users?like=' + name;
    return this.$http.get<IUser>(url).then(res => res.data);
  }

  private storeToLocalStorage(user: IUser): boolean {
    return this.localStorageService.set<IUser>('me', user);
  }

  private updateIn(inputUser: IUser, key: string, value: any): IUser {
    const user = cloneDeep(inputUser);
    user[key] = value;
    return user;
  }
}
