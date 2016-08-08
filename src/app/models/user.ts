import {cloneDeep, isEqual} from 'lodash';
import {ILogService, IHttpService, IPromise} from 'angular';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IUser {
  id: number;
  fullName: string;
  role: string;
  address: string;
}

export class Role {
  public static get GUEST(): string { return 'guest'; }
  public static get CUSTOMER(): string { return 'customer'; }
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
    return Boolean(user.fullName && user.address);
  }

  isGuest(user: IUser): boolean {
    return Boolean(user.role === Role.GUEST || !user.role);
  }

  updateFullNameFor(user: IUser, name: string): IUser {
    return this.updateIn(user, 'fullName', name);
  }

  updateAddressFor(user: IUser, address: string): IUser {
    return this.updateIn(user, 'address', address);
  }

  sync(user: IUser): void {
    if (!this.isValid(user)) {
      this.$log.info('UserService: User is not valid, skip sync', user);
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
      fullName: '',
      role: Role.GUEST,
      address: ''
    };
  }

  private storeInLocalStorage(user: IUser): boolean {
    return this.localStorageService.set<IUser>('me', user);
  }

  private storeInDb(user: IUser): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + user.fullName;
    if (user.id) {
      return this.$http.put<IUser>(url, user).then(res => res.data);
    } else {
      return this.$http.post<IUser>(url, user).then(res => res.data);
    }
  }

  private updateIn(inputUser: IUser, key: string, value: any): IUser {
    const user = cloneDeep(inputUser);
    user[key] = value;
    return user;
  }
}
