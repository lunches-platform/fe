import {IComponentOptions} from 'angular';

import {IBaseState} from '../../../routes';

import {IUser, UserService} from '../../models/user';
// internal types --------------------------------------------------------------
interface ITriggerToggleSidebarEvent {
  (): void;
}

export class ToolbarController {
  // bindings ------------------------------------------------------------------
  // input
  user: IUser;

  // output
  triggerToggleSidebarEvent: ITriggerToggleSidebarEvent;

  constructor(private $state: IBaseState, private lUserService: UserService) {
    'ngInject';
  }

  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  goToPaymentPage(): void {
    this.$state.go('payment');
  }

  isUserRegistered(): boolean {
    return this.lUserService.isRegistered(this.user);
  }

  toggleSidebar(): void {
    this.triggerToggleSidebarEvent();
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm',
  bindings: {
    user: '<',
    triggerToggleSidebarEvent: '&onToggleSidebar'
  }
};

