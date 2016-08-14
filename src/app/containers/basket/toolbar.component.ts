import {IComponentOptions} from 'angular';

import {IBaseState} from '../../../routes';

import {IUser, UserService} from '../../models/user';

export class ToolbarController {
  // bindings ------------------------------------------------------------------
  // input
  inputUser: IUser;

  constructor(private $state: IBaseState, private lUserService: UserService) {
    'ngInject';
  }

  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  isUserRegistered(): boolean {
    return this.lUserService.isRegistered(this.inputUser);
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm'
};

