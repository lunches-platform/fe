import {cloneDeep, isEqual} from 'lodash';
import {ILogService, IHttpService, IPromise} from 'angular';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IUser {
  id: number;
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

  sync(user: IUser): void {
    if (!this.isValid(user)) {
      this.$log.warn('UserService: User is not valid, skip sync', user);
    }

    if (!this.storeInLocalStorage(user)) {
      this.$log.info('UserService: Unable to store user in local storage');
    }

    this.storeInDb(user)
      .catch(err => {
        this.$log.info('UserService: Unable to store user in database');
      });
  }

  isEqual(user1: IUser, user2: IUser): boolean {
    return isEqual(user1, user2);
  }

  createGuest(): IUser {
    return {
      id: 0,
      fullname: '',
      address: ''
    };
  }

  searchUsersBy(name: string): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/users?like=' + name;
    return this.$http.get<IUser>(url).then(res => res.data);
  }

  private storeInLocalStorage(user: IUser): boolean {
    return this.localStorageService.set<IUser>('me', user);
  }

  private storeInDb(user: IUser): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const baseUrl = 'http://api.cogniance.lunches.com.ua/users';
    if (user.id) {
      return this.$http.put<IUser>(baseUrl + '/' + user.fullname, user).then(res => res.data);
    } else {
      return this.$http.post<IUser>(baseUrl, user).then(res => res.data);
    }
  }

  private updateIn(inputUser: IUser, key: string, value: any): IUser {
    const user = cloneDeep(inputUser);
    user[key] = value;
    return user;
  }
}
