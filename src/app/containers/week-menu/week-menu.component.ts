import {WeekMenuService} from './week-menu.service';
import {Menu} from '../../components/menu/menu.service';
import {Order} from '../../models/order.service';
import {IWeekMenuState} from '../../../routes';
import {Basket, BasketService} from '../../containers/basket/basket.service';
import {ILogService} from 'angular';

export class WeekMenuController {
  // input bindings
  basket: Basket;

  // internal bindings
  actualMenu: Menu[] = [];
  pastDaysMenu: Menu[] = [];

  private pastDaysMenuHidden = true;

  constructor(
    private $state: IWeekMenuState,
    private $log: ILogService,
    private lWeekMenuService: WeekMenuService,
    private lBasketService: BasketService
  ) {
    'ngInject';

    this.initBasket();
    this.fetchData();
  }

  onOrderPlaced(order: Order) {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
    const stored = this.lBasketService.storeBasketInStorage(this.basket);

    if (!stored) {
      this.$log.error('WeekMenuController: Unable to store basket in storage');
    }
  }

  goToBasket() {
    this.$state.go('basket');
  }

  isPastDaysMenuHidden(): boolean {
    return this.pastDaysMenuHidden;
  }

  isPastDaysMenuShown(): boolean {
    return !this.pastDaysMenuHidden;
  }

  showPastDaysMenu(): void {
    this.pastDaysMenuHidden = true;
  }

  hidePastDaysMenu(): void {
    this.pastDaysMenuHidden = false;
  }

  hasPastDaysMenu(): boolean {
    return Boolean(this.pastDaysMenu.length);
  }

  togglePastDaysMenu(): void {
    this.pastDaysMenuHidden = !this.pastDaysMenuHidden;
  }

  private fetchData() {
    this.lWeekMenuService.fetchPastDaysMenuForCurrentWeek()
      .then((menus: Menu[]) => {
        this.pastDaysMenu = menus;
      });

    this.lWeekMenuService.fetchActualMenuForCurrentWeek()
      .then((menus: Menu[]) => {
        this.actualMenu = menus;
      });
  }

  private initBasket() {
    this.lBasketService.fetchBasket()
      .then(basket => this.basket = basket)
      .catch(err => {
        this.$log.info('WeekMenuController: Unable to fetch basket. Create new empty one');

        this.basket = new Basket();
      });
  }
}

export const WeekMenuComponent = {
  template: require('./week-menu.html'),
  controller: WeekMenuController,
  controllerAs: 'vm'
};
