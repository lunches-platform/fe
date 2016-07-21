import {ILogService, IQService} from 'angular';

import {WeekMenuService} from './week-menu.service';
import {Menu} from '../../components/menu/menu.service';
import {Order} from '../../models/order.service';
import {IWeekMenuState} from '../../../routes';
import {Basket, BasketService} from '../../containers/basket/basket.service';

export class WeekMenuController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: Basket;
  actualMenu: Menu[];
  pastDaysMenu: Menu[];

  private pastDaysMenuHidden: boolean;
  private loading: boolean;

  constructor(
    private $state: IWeekMenuState,
    private $log: ILogService,
    private $q: IQService,
    private lWeekMenuService: WeekMenuService,
    private lBasketService: BasketService
  ) {
    'ngInject';

    this.initMenu();
    this.initPastDaysSwitcher();
    this.initLoading();
    this.initBasket();
    this.fetchData();
  }

  // dom event handlers --------------------------------------------------------
  onOrderPlaced(order: Order): void {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
    const stored = this.lBasketService.storeBasketInStorage(this.basket);

    if (!stored) {
      this.$log.error('WeekMenuController: Unable to store basket in storage');
    }
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

  isPastDaysMenuShown(): boolean {
    return !this.pastDaysMenuHidden;
  }

  hasPastDaysMenu(): boolean {
    return Boolean(this.pastDaysMenu.length);
  }

  // private init --------------------------------------------------------------
  private initBasket(): void {
    this.lBasketService.fetchBasket()
      .then(basket => this.basket = basket)
      .catch(err => {
        this.$log.info('WeekMenuController: Unable to fetch basket. Create new empty one');

        this.basket = new Basket();
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

  // private helpers -----------------------------------------------------------
  private fetchData(): void {
    this.loading = true;

    // todo: make only one request
    this.$q.all<Menu[]>([
      this.lWeekMenuService.fetchPastDaysMenuForCurrentWeek(),
      this.lWeekMenuService.fetchActualMenuForCurrentWeek()
    ])
      .then(menus => {
        this.pastDaysMenu = menus[0];
        this.actualMenu = menus[1];
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
