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
  user: IUser;

  constructor(private lUserService: UserService) {
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

    this.triggerChangeEventIfValid();
  }

  onFloorSelected(floor: string): void {
    this.user = this.lUserService.updateAddressFor(this.user, floor);

    this.triggerChangeEventIfValid();
  }

  searchUsersBy(name: string) {
    return this.lUserService.searchUsersBy(name);
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
    this.address = this.user.address || null;

    this.fullname = this.user.fullname || null;
  }

  private initUser(): void {
    this.user = this.lUserService.createGuest();
  }

  // private event handlers ----------------------------------------------------
  private onInputUserChanged(inputUser: IUser): void {
    this.inputUser = cloneDeep(inputUser);
    this.user = cloneDeep(inputUser);

    this.initForm();
  }

  private triggerChangeEventIfValid() {
    if (this.lUserService.isEqual(this.inputUser, this.user)) {
      return;
    }

    this.triggerChangeEvent({user: this.user});
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

