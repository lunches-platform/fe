import {cloneDeep, filter, merge} from 'lodash';
import * as angular from 'angular';
import {IQService, IPromise, ILogService} from 'angular';

import {IOrder, OrderService} from './order';
import {IUser} from './user';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IBasket {
  orders: IOrder[];
}

export class BasketService {
  constructor(
    private $q: IQService,
    private $log: ILogService,
    private localStorageService: ILocalStorageService,
    private lOrderService: OrderService
  ) {
    'ngInject';
  }

  createEmptyBasket(): IBasket {
    return {
      orders: []
    };
  }

  addOrderTo(_basket: IBasket, order: IOrder): IBasket {
    const basket = cloneDeep(_basket);
    basket.orders.push(order);
    return basket;
  }

  addOrdersTo(_basket: IBasket, orders: IOrder[]): IBasket {
    const basket = cloneDeep(_basket);
    merge(basket.orders, orders);
    return basket;
  }

  fetchBasket(): IPromise<IBasket> {
    const basket = this.localStorageService.get('basket');

    if (basket) {
      return this.$q.resolve(basket);
    } else {
      return this.$q.reject({msg: 'No basket found in local storage'});
    }
  }

  sync(basket: IBasket): IPromise<IBasket> {
    // todo: do we need to check validity here?
    // todo: if yes, how to handle the full week order?
    // if (!this.isValid(basket)) {
    //   this.$log.warn('Basket:sync: Basket is not valid, skip sync', basket);
    //   return this.$q.reject();
    // }
    return this.updateInStorages(basket);
  }

  // todo: add api storage
  updateInStorages(basket: IBasket): IPromise<IBasket> {
    const stored = this.storeBasketInLocalStorage(basket);

    if (!stored) {
      this.$log.error('Basket: Unable to store basket in local storage');
    }

    return this.fetchBasket();
  }

  isValid(basket: IBasket): boolean {
    return this.lOrderService.isValidAll(basket.orders);
  }

  setUserToEachOrderIn(_basket: IBasket, user: IUser): IBasket {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setUserForAll(basket.orders, user);
    return basket;
  }

  clearBasket(basket: IBasket): IBasket {
    return this.createEmptyBasket();
  }

  removeOrderFrom(_basket: IBasket, order: IOrder): IBasket {
    let basket = cloneDeep(_basket);
    basket.orders = filter<IOrder>(basket.orders, o => o.id !== order.id);
    return basket;
  }

  private storeBasketInLocalStorage(basket: IBasket): boolean {
    if (!basket) {
      return false;
    }

    return this.localStorageService.set('basket', basket);
  }
}
