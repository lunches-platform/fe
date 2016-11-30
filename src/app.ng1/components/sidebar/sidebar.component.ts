import { IComponentOptions } from 'angular';
import { RouterWrapper } from '../../../app/ng1';

import { IUser, UserService } from '../../models/user';

type ISidenavService = angular.material.ISidenavService;
type IMedia = angular.material.IMedia;

export class SidebarController {
  user: IUser;

  constructor(
    private router: RouterWrapper,
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
    this.$mdSidenav('left').toggle();
    this.router.navigate(['/week-menu']);
  }

  goToMyOrders(): void {
    this.$mdSidenav('left').toggle();
    this.router.navigate(['/my-orders']);
  }

  goToBasket(): void {
    this.$mdSidenav('left').toggle();
    this.router.navigate(['/basket']);
  }

  goToPaymentPage(): void {
    this.$mdSidenav('left').toggle();
    this.router.navigate(['/payment']);
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

