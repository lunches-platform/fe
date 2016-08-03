import {cloneDeep, filter} from 'lodash';
import * as angular from 'angular';
import {IQService, IPromise} from 'angular';

import {IOrder, OrderService} from './order';

type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IBasket {
  orders: IOrder[];
}

export class BasketService {
  constructor(
    private $q: IQService,
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

  fetchBasket(): IPromise<IBasket> {
    const basket = this.localStorageService.get('basket');

    if (basket) {
      return this.$q.resolve(basket);
    } else {
      return this.$q.reject({msg: 'No basket found in local storage'});
    }
  }

  setCustomerForAllOrdersIn(_basket: IBasket, customer: string): IBasket {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setCustomerForAll(basket.orders, customer);
    return basket;
  }

  setAddressForAllOrdersIn(_basket: IBasket, address: string): IBasket {
    let basket = cloneDeep(_basket);
    basket.orders = this.lOrderService.setAddressForAll(basket.orders, address);
    return basket;
  }

  storeBasketInStorage(basket: IBasket): boolean {
    return this.storeBasketInLocalStorage(basket);
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
