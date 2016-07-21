import {cloneDeep, map, filter} from 'lodash';
import * as angular from 'angular';
import {IQService, IPromise} from 'angular';

import {Order, OrderService} from '../../models/order.service';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export class Basket {
  orders: Order[];

  constructor() {
    this.initOrders();
  }

  initOrders() {
    this.orders = [];
  }
}

export class BasketService {
  constructor(
    private $q: IQService,
    private localStorageService: ILocalStorageService,
    private lOrderService: OrderService
  ) {
    'ngInject';
  }

  addOrderTo(_basket: Basket, order: Order): Basket {
    const basket = cloneDeep(_basket);
    basket.orders.push(order);
    return basket;
  }

  fetchBasket(): IPromise<Basket> {
    const basketJson = this.localStorageService.get('basket');

    if (basketJson) {
      return this.$q.resolve(this.createBasketFrom(basketJson));
    } else {
      return this.$q.reject({msg: 'No basket found in local storage'});
    }
  }

  createBasketFrom(basketJson): Basket {
    let basket = new Basket();
    basket.orders = map(basketJson.orders, order => this.lOrderService.createOrderFrom(order));
    return basket;
  }

  setCustomerForAllOrdersIn(_basket: Basket, customer: string): Basket {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setCustomerForAll(basket.orders, customer);
    return basket;
  }

  setAddressForAllOrdersIn(_basket: Basket, address: string): Basket {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setAddressForAll(basket.orders, address);
    return basket;
  }

  storeBasketInStorage(basket: Basket): boolean {
    return this.storeBasketInLocalStorage(basket);
  }

  clearBasket(basket: Basket): Basket {
    return new Basket();
  }

  removeOrderFrom(_basket: Basket, order: Order): Basket {
    let basket = cloneDeep(_basket);
    basket.orders = filter<Order>(basket.orders, o => o.id !== order.id);
    return basket;
  }

  private storeBasketInLocalStorage(basket: Basket): boolean {
    if (!basket) {
      return false;
    }

    return this.localStorageService.set('basket', basket);
  }
}
