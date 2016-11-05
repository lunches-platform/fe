import {ILogService, IScope} from 'angular';

import {IWeekMenuState} from '../../../routes';

import {IOrder, OrderService} from '../../models/order';
import {IMenu, IWeekMenu, MenuType, MenuService} from '../../models/menu';
import {IUser, UserService} from '../../models/user';
import {IBasket, BasketService} from '../../models/basket';
import {PriceService} from '../../models/price';

type ISidenavService = angular.material.ISidenavService;

export enum Week {
  Current,
  Next
}

export class WeekMenuController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: IBasket;
  selectedWeek: number;
  selectedMenuType: MenuType;
  nextWeekMenu: IWeekMenu<MenuType, IMenu>;
  currentWeekMenu: IWeekMenu<MenuType, IMenu>;
  user: IUser;

  // these two are just shortcut for currentWeekMenu
  actualMenu: IWeekMenu<MenuType, IMenu>;
  pastDaysMenu: IWeekMenu<MenuType, IMenu>;

  private pastDaysMenuHidden: boolean;
  private loading: boolean;

  constructor(
    private $state: IWeekMenuState,
    private $scope: IScope,
    private $log: ILogService,
    private $mdSidenav: ISidenavService,
    private lMenuService: MenuService,
    private lBasketService: BasketService,
    private lUserService: UserService,
    private lPriceService: PriceService,
    private lOrderService: OrderService
  ) {
    'ngInject';

    this.initUser();
    this.initMenu();
    this.initPastDaysSwitcher();
    this.initLoading();
    this.initBasket();
    this.initPageTitle();
    this.fetchData();
  }

  // dom event handlers --------------------------------------------------------
  onOrderPlaced(order: IOrder): void {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
    this.lBasketService.sync(this.basket);
  }

  onWholeWeekOrder(): void {
    let weekMenu = this.selectedWeek === Week.Current ? this.actualMenu[this.selectedMenuType] : this.nextWeekMenu[this.selectedMenuType];
    let orders = this.lOrderService.createOrdersFrom(weekMenu);
    this.basket = this.lBasketService.addOrdersTo(this.basket, orders);

    this.lBasketService.sync(this.basket)
      .then(() => {
        this.goToBasket();
      })
      .catch(() => {
        // todo: add fail over
      });
  }

  onToggleSidebar(): void {
    this.$mdSidenav('left').toggle();
  }

  onWeekChanged(week: Week): void {
    this.selectedWeek = week;
  }

  onMenuTypeSwitched(menuType: MenuType): void {
    this.selectedMenuType = menuType;
  }

  selectNextWeek(): void {
    this.selectedWeek = Week.Next;
  }

  switchPastDaysMenu(): void {
    this.pastDaysMenuHidden = !this.pastDaysMenuHidden;
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  showPastDaysMenu(): void {
    this.pastDaysMenuHidden = true;
  }

  hidePastDaysMenu(): void {
    this.pastDaysMenuHidden = false;
  }

  // view helpers --------------------------------------------------------------
  isLoading(): boolean {
    return this.loading;
  }

  isPastDaysMenuHidden(): boolean {
    return this.pastDaysMenuHidden;
  }

  needToShowCurrentWeekViewMenu(): boolean {
    return !this.pastDaysMenuHidden;
  }

  needToShowPastDaysSwitcher(): boolean {
    return this.hasPastDaysMenu() && this.hasActualMenu();
  }

  needToShowCurrentWeekOrderImpossible(): boolean {
    return !this.isOrderAllowedInTheCurrentWeek();
  }

  needToShowNoData(): boolean {
    return this.isCurrentMenuEmpty() || this.isNextMenuEmpty();
  }

  hasItemsInBasket(): boolean {
    return Boolean(this.basket.orders.length);
  }

  // private init --------------------------------------------------------------
  private initBasket(): void {
    this.lBasketService.fetchBasket()
      .then(basket => this.basket = basket)
      .catch(err => {
        this.$log.info('WeekMenuController: Unable to fetch basket. Create new empty one');

        this.basket = this.lBasketService.createEmptyBasket();
      });
  }

  private initPastDaysSwitcher(): void {
    this.pastDaysMenuHidden = true;
  }

  private initLoading(): void {
    this.loading = true;
  }

  private initMenu(): void {
    // this.pastDaysMenu = {diet: [] as IMenu[], regular: [] as IMenu[]};
    // this.actualMenu = {diet: [], regular: []};
    this.selectedMenuType = 'regular';
  }

  private initSelectedWeek(): void {
    if (this.isOrderAllowedInTheCurrentWeek()) {
      this.selectedWeek = Week.Current;
    } else {
      this.selectedWeek = Week.Next;
    }
  }

  private initPageTitle(): void {
    this.$scope.$watch(() => this.selectedWeek, () => {
      this.$state.current.data.title = this.selectedWeek === Week.Current ? 'Меню на текущую неделю' : 'Меню на следующую неделю';
    });
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  // todo: simplify
  private fetchData(): void {
    this.loading = true;

    this.lMenuService.fetchTwoWeeksMenu()
      .then(twoWeeks => {
        [this.currentWeekMenu, this.nextWeekMenu] = twoWeeks;
        [this.pastDaysMenu, this.actualMenu] = this.lMenuService.splitToPastAndActualDaysMenu(this.currentWeekMenu);

        // todo: move to separate method?
        if (!this.hasActualMenu()) {
          this.pastDaysMenuHidden = false;
        }

        this.initSelectedWeek();

        // return this.lPriceService.fetchPriceGroupsForActualDays();
      })
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
  }

  private isCurrentMenuEmpty(): boolean {
    return (this.selectedWeek === Week.Current && !Boolean(this.currentWeekMenu[this.selectedMenuType].length));
  }

  private isNextMenuEmpty(): boolean {
     return this.selectedWeek === Week.Next && !Boolean(this.nextWeekMenu[this.selectedMenuType].length);
  }

  private hasActualMenu(): boolean {
    return Boolean(this.actualMenu[this.selectedMenuType].length);
  }

  private hasPastDaysMenu(): boolean {
    return Boolean(this.pastDaysMenu[this.selectedMenuType].length);
  }

  private isOrderAllowedInTheCurrentWeek(): boolean {
    return this.hasActualMenu();
  }

  // private event handlers ----------------------------------------------------
  // place smth like onSmthChanged() when watching some property privately
}

// component definition --------------------------------------------------------
export const WeekMenuComponent = {
  template: require('./week-menu.html'),
  controller: WeekMenuController,
  controllerAs: 'vm'
};
