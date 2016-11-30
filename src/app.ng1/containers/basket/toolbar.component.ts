import { IComponentOptions } from 'angular';

import { RouterWrapper } from '../../../app/ng1';

import { IUser, UserService } from '../../models/user';
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

  constructor(private router: RouterWrapper, private lUserService: UserService) {
    'ngInject';
  }

  goToWeekMenu(): void {
    this.router.navigate(['/week-menu']);
  }

  goToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }

  goToPaymentPage(): void {
    this.router.navigate(['/payment']);
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

