import {WeekMenuService} from './week-menu.service';
import {Menu} from '../menu/menu.service';
import {Order} from '../../models/order.service';
import {cloneDeep} from 'lodash';

interface ITriggerOrderChangeEvent {
  (arg: { order: Order }): void;
}

export class WeekMenuController {
  // input bindings
  order: Order;

  // output bindings
  triggerOrderChange: ITriggerOrderChangeEvent;

  // internal bindings
  menus: Menu[];

  constructor(private lWeekMenuService: WeekMenuService) {
    'ngInject';

    this.initOrder();
    this.fetchData();
  }

  onOrderChanged(order: Order) {
    this.order = cloneDeep(order);

    this.triggerOrderChange({ order: this.order });
  }

  private initOrder() {
    this.order = cloneDeep(this.order);
  }

  private fetchData() {
    this.lWeekMenuService.fetchAll()
      .then((menus: Menu[]) => {
        this.menus = menus;
      })
    ;
  }
}

export const WeekMenuComponent = {
  templateUrl: 'app/components/week-menu/week-menu.html',
  controller: WeekMenuController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerOrderChange: '&onOrderChanged'
  }
};
