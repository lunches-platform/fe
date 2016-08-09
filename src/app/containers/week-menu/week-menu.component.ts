import {ILogService, IScope} from 'angular';

import {IWeekMenuState} from '../../../routes';

import {IOrder} from '../../models/order';
import {IMenu, IWeekMenu, MenuType, MenuService} from '../../models/menu';
import {IUser, UserService} from '../../models/user';
import {IBasket, BasketService} from '../../models/basket';

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
    private lMenuService: MenuService,
    private lBasketService: BasketService,
    private lUserService: UserService
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
    const stored = this.lBasketService.storeBasketInStorage(this.basket);

    if (!stored) {
      this.$log.error('WeekMenuController: Unable to store basket in storage');
    }
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

  togglePastDaysMenu(): void {
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

    this.lMenuService.fetchTwoWeekMenu()
      .then(twoWeeks => {
        [this.currentWeekMenu, this.nextWeekMenu] = twoWeeks;
        [this.pastDaysMenu, this.actualMenu] = this.lMenuService.splitToPastAndActualDaysMenu(this.currentWeekMenu);

        // todo: move to separate method?
        if (!this.hasActualMenu()) {
          this.pastDaysMenuHidden = false;
        }

        this.initSelectedWeek();
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
