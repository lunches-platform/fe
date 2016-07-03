import {Order} from '../models/order.service';
import {cloneDeep} from 'lodash';
import {IAppState} from '../../routes';

export class AppController {
  order: Order;

  constructor(private $state: IAppState) {
    'ngInject';

    this.initOrder();
  }

  onOrderChanged(order: Order) {
    this.order = cloneDeep(order);
  }

  goToBasket() {
    this.$state.go('basket', {order: this.order});
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
