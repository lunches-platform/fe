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
  menus: Menu[];

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

  private fetchData() {
    this.lWeekMenuService.fetchAll()
      .then((menus: Menu[]) => {
        this.menus = menus;
      })
    ;
  }

  private initOrder() {
    this.order = new Order();
  }
}

export const WeekMenuComponent = {
  templateUrl: 'app/containers/week-menu/week-menu.html',
  controller: WeekMenuController,
  controllerAs: 'vm'
};
