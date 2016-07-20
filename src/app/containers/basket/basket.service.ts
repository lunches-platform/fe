import * as angular from 'angular';
import {Order, OrderService} from '../../models/order.service';
import {cloneDeep, map} from 'lodash';
import {IQService, IPromise} from 'angular';

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

  createBasketFrom(basketJson) {
    let basket = new Basket();
    basket.orders = map(basketJson.orders, order => this.lOrderService.createOrderFrom(order));
    return basket;
  }

  setCustomerForAllOrdersIn(_basket: Basket, customer: string) {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setCustomerForAll(basket.orders, customer);
    return basket;
  }

  setAddressForAllOrdersIn(_basket: Basket, address: string) {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setAddressForAll(basket.orders, address);
    return basket;
  }

  storeBasketInStorage(basket: Basket): boolean {
    return this.storeBasketInLocalStorage(basket);
  }

  clearBasket(basket: Basket) {
    return new Basket();
  }

  private storeBasketInLocalStorage(basket: Basket): boolean {
    if (!basket) {
      return false;
    }

    return this.localStorageService.set('basket', basket);
  }
}
