import {OrderItem} from './order.service';
import {cloneDeep} from 'lodash';

export class Basket {
  orderItems: OrderItem[] = [];
}

export class BasketService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  putTo(_basket: Basket, orderItem: OrderItem): Basket {
    let basket = cloneDeep(_basket);

    basket.orderItems.push(orderItem);

    return basket;
  }
}

