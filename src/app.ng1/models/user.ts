// third-party deps
import {cloneDeep, isEqual, get} from 'lodash';
import {ILogService, IHttpService, IPromise, IQService} from 'angular';
type ILocalStorageService = angular.local.storage.ILocalStorageService;

// internal deps
import {IAppConfig} from '../../config';

export interface IUser {
  id: string;
  fullname: string;
  address: string;
  clientId: string;
}

enum Address {
  Company,
  Street,
  BuldingNumber,
  Floor
}

export class UserService {
  constructor(
    private $http: IHttpService,
    private $log: ILogService,
    private $q: IQService,
    private localStorageService: ILocalStorageService,
    private lConfig: IAppConfig
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

  updateAddressFloorFor(user: IUser, floor: string): IUser {
    let addressDetails = user.address.split(', ');
    addressDetails[Address.Floor] = floor;
    return this.updateIn(user, 'address', addressDetails.join(', '));
  }

  hasFullAddress(user: IUser): boolean {
    return Boolean(user.address.length > 1);
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
      return this.$q.reject();
    }

    return this.isGuest(user) ? this.create(user) : this.update(user);
  }

  createInDb(user: IUser): IPromise<IUser> {
    const url = this.lConfig.apiUrl + '/users';
    return this.$http.post<IUser>(url, {username: user.fullname, address: user.address}).then(res => res.data);
  }

  updateInDb(user: IUser): IPromise<IUser> {
    const baseUrl = this.lConfig.apiUrl;
    return this.$http.put<IUser>(baseUrl + '/users/' + user.fullname, {address: user.address}).then(res => res.data);
  }

  isEqual(user1: IUser, user2: IUser): boolean {
    return isEqual(user1, user2);
  }

  createGuest(fullname?: string, address?: string): IUser {
    return {
      id: null,
      fullname: fullname || '',
      address: address || '',
      clientId: ''
    };
  }

  isGuest(user: IUser): boolean {
    return !this.isRegistered(user);
  }

  isRegistered(user: IUser): boolean {
    return Boolean(user && user.id);
  }

  searchUsersBy(name: string): IPromise<IUser> {
    const url = this.lConfig.apiUrl + '/users?like=' + name;

    return this.$http.get<IUser>(url).then(res => res.data);
  }

  setCompanyAddressFor(inputUser: IUser): IUser {
    let user = cloneDeep(inputUser);
    user.address = this.lConfig.address.details.join(', ');
    return user;
  }

  fetchFloorFrom(address: string): string {
    return this.fetchAddressPartFrom(address, Address.Floor);
  }

  isFloorEmptyIn(address: string): boolean {
    return !Boolean(this.fetchFloorFrom(address));
  }

  setFloorFor(address: string, floor: string): string {
    let addr = address.split(', ');
    addr[Address.Floor] = floor;
    return addr.join(', ');
  }

  setFloorForUser(inputUser: IUser, floor: string): IUser {
    let user = cloneDeep(inputUser);
    user.address = this.setFloorFor(user.address, floor);
    return user;
  }

  private fetchAddressPartFrom(address: string, partIndex: number): string {
    return get<string>(address.split(', '), partIndex);
  }

  private storeToLocalStorage(user: IUser): boolean {
    return this.localStorageService.set<IUser>('me', user);
  }

  private updateIn(inputUser: IUser, key: string, value: string): IUser {
    const user = cloneDeep(inputUser);
    user[key] = value;
    return user;
  }
}