import {Order} from '../models/order.service';
import {cloneDeep} from 'lodash';

export class AppController {
  order: Order;

  constructor() {
    this.initOrder();
  }

  onOrderChanged(order: Order) {
    this.order = cloneDeep(order);
    console.log(this.order);
  }

  private initOrder() {
    this.order = new Order();
  }
}

export const AppComponent = {
  templateUrl: 'app/containers/app.html',
  controller: AppController,
  controllerAs: 'vm'
};
