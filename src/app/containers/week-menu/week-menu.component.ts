import {ILogService} from 'angular';

import {WeekMenuService} from './week-menu.service';
import {IMenu} from '../../components/menu/menu.service';
import {IOrder} from '../../models/order';
import {IWeekMenuState} from '../../../routes';
import {IBasket, BasketService} from '../../containers/basket/basket.service';
import {Week} from '../../components/week-switcher/week-switcher.component';

export class WeekMenuController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: IBasket;
  selectedWeek: Week;
  nextWeekMenu: IMenu[];
  currentWeekMenu: IMenu[];

  // these two are just shortcut for currentWeekMenu
  actualMenu: IMenu[];
  pastDaysMenu: IMenu[];

  private pastDaysMenuHidden: boolean;
  private loading: boolean;

  constructor(
    private $state: IWeekMenuState,
    private $log: ILogService,
    private lWeekMenuService: WeekMenuService,
    private lBasketService: BasketService
  ) {
    'ngInject';

    this.initMenu();
    this.initPastDaysSwitcher();
    this.initWeekSwitcher();
    this.initLoading();
    this.initBasket();
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
    return this.selectedWeek === Week.Current && !this.pastDaysMenuHidden;
  }

  needToShowCurrentWeekOrderMenu(): boolean {
    return this.selectedWeek === Week.Current && Boolean(this.actualMenu.length);
  }

  needToShowNextWeek(): boolean {
    return this.selectedWeek === Week.Next;
  }

  needToShowPastDaysSwitcher(): boolean {
    return Boolean(this.pastDaysMenu.length) && Boolean(this.actualMenu.length);
  }

  needToShowCurrentWeekOrderImpossible(): boolean {
    return this.selectedWeek === Week.Current && this.actualMenu.length === 0;
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

  // private helpers -----------------------------------------------------------
  private fetchData(): void {
    this.loading = true;

    this.lWeekMenuService.fetchTwoWeekMenu()
      .then(twoWeeks => {
        [this.currentWeekMenu, this.nextWeekMenu] = twoWeeks;
        [this.pastDaysMenu, this.actualMenu] = this.lWeekMenuService.splitToPastAndActualDaysMenu(this.currentWeekMenu);

        // todo: move to separate method?
        if (this.actualMenu.length === 0) {
          this.pastDaysMenuHidden = false;
        }
      })
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
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
