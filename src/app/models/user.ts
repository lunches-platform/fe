import {cloneDeep} from 'lodash';
import {ILogService, IHttpService, IPromise} from 'angular';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IUser {
  id: number;
  fullName: string;
  role: number;
  address?: string;
}

export enum Role {
  Guest,
  Customer
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

    this.$log.info('UserService: No current user found in local storage. Create guest');

    if (!me) {
      this.localStorageService.set<IUser>('me', this.createGuest());
      me = this.localStorageService.get<IUser>('me');
    }

    return me;
  }

  isGuest(user: IUser): boolean {
    return Boolean(user.role === Role.Guest);
  }

  updateFullNameFor(user: IUser, name: string): IUser {
    return this.updateIn(user, 'fullName', name);
  }

  updateAddressFor(user: IUser, address: string): IUser {
    return this.updateIn(user, 'address', address);
  }

  sync(user: IUser): IPromise<IUser> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + user.fullName;
    return this.$http.put<IUser>(url, user).then(res => res.data);
  }

  private updateIn(inputUser: IUser, key: string, value: any): IUser {
    const user = cloneDeep(inputUser);
    user[key] = value;
    return user;
  }

  private createGuest(): IUser {
    return {
      id: 0,
      fullName: 'Гость',
      role: Role.Guest
    };
  }
}
