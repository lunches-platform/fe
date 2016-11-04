import {IComponentOptions} from 'angular';
import {IBaseState} from '../../../routes';

import {IUser, UserService} from '../../models/user';

type ISidenavService = angular.material.ISidenavService;
type IMedia = angular.material.IMedia;

export class SidebarController {
  user: IUser;

  constructor(
    private $state: IBaseState,
    private $mdSidenav: ISidenavService,
    private $mdMedia: IMedia,
    private lUserService: UserService
  ) {
    'ngInject';
  }

  get userRegistered(): boolean {
    return this.lUserService.isRegistered(this.user);
  }

  get lockedOpen(): boolean {
    return this.$mdMedia('gt-sm');
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

export const SidebarComponent: IComponentOptions = {
  template: require('./sidebar.html'),
  controller: SidebarController,
  controllerAs: 'vm',
  bindings: {
    user: '<'
  }
};

