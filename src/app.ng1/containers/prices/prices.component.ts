import {ILogService} from 'angular';

type ISidenavService = angular.material.ISidenavService;

import {RouterWrapper} from '../../../app/ng1';

import {IMenu, MenuService} from '../../models/menu';
import {IUser, UserService} from '../../models/user';

export class PricesController {
  // bindings ------------------------------------------------------------------
  // internal
  user: IUser;
  twoWeeksMenu: IMenu[];

  private loading: boolean;

  constructor(
    private router: RouterWrapper,
    private $log: ILogService,
    private $mdSidenav: ISidenavService,
    private lMenuService: MenuService,
    // private lPriceService: PriceService,
    private lUserService: UserService
  ) {
    'ngInject';

    this.initLoading();
    this.initUser();
    this.fetchMenus();
  }

  // dom event handlers --------------------------------------------------------
  fetchMenus(): void {
    this.loading = true;

    this.lMenuService.fetchPlainTwoWeeksMenu()
      .then(twoWeeksMenu => this.twoWeeksMenu = twoWeeksMenu)
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
  }

  fillPrices(): void {
    // const twoWeeksMenuPriceGroups = this.lPriceService.createPriceGroupsForAllMenus(this.twoWeeksMenu);
    // this.lPriceService.pushPriceGroups(twoWeeksMenuPriceGroups);
  }

  // view helpers --------------------------------------------------------------
  isLoading(): boolean {
    return this.loading;
  }

  onToggleSidebar(): void {
    this.$mdSidenav('left').toggle();
  }

  goToWeekMenu(): void {
    this.router.navigate(['/week-menu']);
  }

  goToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }

  // private init --------------------------------------------------------------
  private initLoading(): void {
    this.loading = true;
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const PricesComponent = {
  template: require('./prices.html'),
  controller: PricesController,
  controllerAs: 'vm'
};

