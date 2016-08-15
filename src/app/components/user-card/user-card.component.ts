import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

import {IUser, UserService} from '../../models/user';

// internal types --------------------------------------------------------------
interface ITriggerChangeEvent {
  (arg: { user: IUser }): void;
}

export class UserCardController {
  // bindings ------------------------------------------------------------------
  // input
  inputUser: IUser;

  // output
  triggerChangeEvent: ITriggerChangeEvent;

  // internal
  fullname: string;
  address: string;
  floor: string;
  user: IUser;

  // todo: add type for lConfig
  constructor(private lUserService: UserService, private lConfig) {
    'ngInject';

    this.initUser();
  }

  // dom event handlers --------------------------------------------------------
  onFullNameChange(fullname: string): void {
    this.fullname = fullname;
    this.user = this.lUserService.updateFullNameFor(this.user, this.fullname);

    this.triggerChangeEventIfValid();
  }

  onUserSelected(user: IUser) {
    if (!user) {
      return;
    }

    this.user = user;
    this.setFullAddressIfNeeded();

    this.triggerChangeEventIfValid();
  }

  onFloorSelected(floor: string): void {
    if (!floor) {
      return;
    }

    this.floor = floor;

    this.user = this.lUserService.updateAddressFloorFor(this.user, floor);

    this.triggerChangeEventIfValid();
  }

  searchUsersBy(name: string) {
    return this.lUserService.searchUsersBy(name);
  }

  // view helpers --------------------------------------------------------------
  isFloorInsteadOfAddress(): boolean {
    return this.lConfig.address.options.floorSelector;
  }

  isRegularAddressField(): boolean {
    return !this.isFloorInsteadOfAddress();
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList): void {
    /* tslint:disable:no-string-literal */
    if (changes['inputUser']) {
      this.onInputUserChanged(changes['inputUser'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initForm(): void {
    if (this.lUserService.isFloorEmptyIn(this.user.address)) {
      this.user = this.lUserService.setFloorForUser(this.user, '1');
      this.triggerChangeEventIfValid();
    }

    this.address = this.user.address || null;
    this.floor = this.lUserService.fetchFloorFrom(this.address);

    this.fullname = this.user.fullname || null;
  }

  private initUser(): void {
    this.user = this.lUserService.createGuest();
  }

  // private event handlers ----------------------------------------------------
  private onInputUserChanged(inputUser: IUser): void {
    this.inputUser = cloneDeep(inputUser);
    this.user = cloneDeep(inputUser);

    this.setFullAddressIfNeeded();

    this.initForm();
  }

  private triggerChangeEventIfValid() {
    if (this.lUserService.isEqual(this.inputUser, this.user)) {
      return;
    }

    this.triggerChangeEvent({user: this.user});
  }

  private setFullAddressIfNeeded(): void {
    if (!this.lUserService.hasFullAddress(this.user)) {
      this.user = this.lUserService.setCompanyAddressFor(this.user);

      this.triggerChangeEventIfValid();
    }
  }
}

// component definition --------------------------------------------------------
export const UserCardComponent: IComponentOptions = {
  template: require('./user-card.html'),
  controller: UserCardController,
  controllerAs: 'vm',
  bindings: {
    inputUser: '<user',
    triggerChangeEvent: '&onChanged'
  }
};

