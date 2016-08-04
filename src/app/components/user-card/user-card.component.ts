import {cloneDeep, isEqual} from 'lodash';
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
  fullName: string;
  address: string;
  user: IUser;

  constructor(private lUserService: UserService) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  onFullNameChange(fullName: string): void {
    this.user = this.lUserService.updateFullNameFor(this.user, fullName);

    if (isEqual(this.inputUser, this.user)) {
      return;
    }

    this.triggerChangeEvent({user: this.user});
  }

  onFloorSelected(floor: string): void {
    this.user = this.lUserService.updateAddressFor(this.user, floor);

    if (isEqual(this.inputUser, this.user)) {
      return;
    }

    this.triggerChangeEvent({user: this.user});
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
    this.fullName = this.user.fullName || null;
    this.address = this.user.address || null;
  }

  // private event handlers ----------------------------------------------------
  private onInputUserChanged(inputUser: IUser): void {
    this.inputUser = cloneDeep(inputUser);
    this.user = cloneDeep(inputUser);

    this.initForm();
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

