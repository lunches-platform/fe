import {IComponentOptions} from 'angular';
import {IBaseState} from '../../../routes';

import {IUser, UserService} from '../../models/user';

type ISidenavService = angular.material.ISidenavService;

export class SidebarController {
  // bindings ------------------------------------------------------------------
  // input
  user: IUser;

  constructor(private $state: IBaseState, private $mdSidenav: ISidenavService, private lUserService: UserService) {
    'ngInject';
  }

  isUserRegistered(): boolean {
    return this.lUserService.isRegistered(this.user);
  }

  isGuest(): boolean {
    return !this.isUserRegistered();
  }

  goToWeekMenu(): void {
    if (this.$state.current.name === 'week-menu') {
      this.$mdSidenav('left').close();
    } else {
      this.$state.go('week-menu');
    }
  }

  goToMyOrders(): void {
    if (this.$state.current.name === 'my-orders') {
      this.$mdSidenav('left').close();
    } else {
      this.$state.go('my-orders');
    }
  }

  goToBasket(): void {
    if (this.$state.current.name === 'basket') {
      this.$mdSidenav('left').close();
    } else {
      this.$state.go('basket');
    }
  }

  goToPaymentPage(): void {
    if (this.$state.current.name === 'payment') {
      this.$mdSidenav('left').close();
    } else {
      this.$state.go('payment');
    }
  }
}

// component definition --------------------------------------------------------
export const SidebarComponent: IComponentOptions = {
  template: require('./sidebar.html'),
  controller: SidebarController,
  controllerAs: 'vm',
  bindings: {
    user: '<'
  }
};

