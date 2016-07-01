import {Order} from './order.service';
import {cloneDeep} from 'lodash';

export class Basket {
  orders: Order[] = [];
}

export class BasketService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  putTo(_basket: Basket, order: Order): Basket {
    let basket = cloneDeep(_basket);

    basket.orders.push(order);

    return basket;
  }
}

