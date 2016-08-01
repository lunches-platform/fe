import {ILogService, IScope} from 'angular';

import {IWeekMenuState} from '../../../routes';

import {IOrder} from '../../models/order';
import {IMenu, MenuService} from '../../models/menu';
import {IUser, UserService} from '../../models/user';
import {IBasket, BasketService} from '../../containers/basket/basket.service';

import {Week} from '../../components/week-switcher/week-switcher.component';

export class WeekMenuController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: IBasket;
  selectedWeek: Week;
  nextWeekMenu: IMenu[];
  currentWeekMenu: IMenu[];
  user: IUser;

  // these two are just shortcut for currentWeekMenu
  actualMenu: IMenu[];
  pastDaysMenu: IMenu[];

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
    this.initWeekSwitcher();
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
    return this.isCurrentWeek() && !this.pastDaysMenuHidden;
  }

  needToShowCurrentWeekOrderMenu(): boolean {
    return this.isCurrentWeek() && this.hasActualMenu();
  }

  needToShowNextWeek(): boolean {
    return this.isNextWeek();
  }

  needToShowPastDaysSwitcher(): boolean {
    return this.isCurrentWeek() && this.hasPastDaysMenu() && this.hasActualMenu();
  }

  needToShowCurrentWeekOrderImpossible(): boolean {
    return this.isCurrentWeek() && !this.hasActualMenu();
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
    this.pastDaysMenu = [];
    this.actualMenu = [];
  }

  private initWeekSwitcher(): void {
    this.selectedWeek = Week.Current;
  }

  private initPageTitle(): void {
    this.$scope.$watch(() => this.selectedWeek, () => {
      this.$state.current.data.title = this.isCurrentWeek() ? 'Меню на текущую неделю' : 'Меню на следующую неделю';
    });
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  private fetchData(): void {
    this.loading = true;

    this.lMenuService.fetchTwoWeekMenu()
      .then(twoWeeks => {
        [this.currentWeekMenu, this.nextWeekMenu] = twoWeeks;
        [this.pastDaysMenu, this.actualMenu] = this.lMenuService.splitToPastAndActualDaysMenu(this.currentWeekMenu);

        // todo: move to separate method?
        if (this.actualMenu.length === 0) {
          this.pastDaysMenuHidden = false;
        }
      })
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
  }

  private isCurrentMenuEmpty(): boolean {
     return this.selectedWeek === Week.Current && !Boolean(this.currentWeekMenu.length);
  }

  private isNextMenuEmpty(): boolean {
     return this.isNextWeek() && !Boolean(this.nextWeekMenu.length);
  }

  private isCurrentWeek(): boolean {
    return this.selectedWeek === Week.Current;
  }

  private isNextWeek(): boolean {
    return this.selectedWeek === Week.Next;
  }

  private hasActualMenu(): boolean {
    return Boolean(this.actualMenu.length);
  }

  private hasPastDaysMenu(): boolean {
    return Boolean(this.pastDaysMenu.length);
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
