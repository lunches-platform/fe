import {WeekMenuService} from './week-menu.service';
import {Menu} from '../../components/menu/menu.service';
import {Order} from '../../models/order.service';
import {cloneDeep} from 'lodash';
import {IWeekMenuState} from '../../../routes';

interface ITriggerOrderChangeEvent {
  (arg: { order: Order }): void;
}

export class WeekMenuController {
  // input bindings
  order: Order;

  // output bindings
  triggerOrderChange: ITriggerOrderChangeEvent;

  // internal bindings
  actualMenu: Menu[] = [];
  pastDaysMenu: Menu[] = [];

  private pastDaysMenuHidden = true;

  constructor(private $state: IWeekMenuState, private lWeekMenuService: WeekMenuService) {
    'ngInject';

    this.initOrder();
    this.fetchData();
  }

  onOrderChanged(order: Order) {
    this.order = cloneDeep(order);
  }

  goToBasket() {
    this.$state.go('basket', {order: this.order});
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
        console.log('pastDaysMenu', this.pastDaysMenu);
      });

    this.lWeekMenuService.fetchActualMenuForCurrentWeek()
      .then((menus: Menu[]) => {
        this.actualMenu = menus;
        console.log('actualMenu', this.actualMenu);
      });
  }

  private initOrder() {
    this.order = new Order();
  }
}

export const WeekMenuComponent = {
  template: require('./week-menu.html'),
  controller: WeekMenuController,
  controllerAs: 'vm'
};
