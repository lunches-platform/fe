import {cloneDeep} from 'lodash';
import {IScope, ILogService} from 'angular';

import {IBasketState} from '../../../routes';

import {IOrder, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';
import {ToastService} from '../../models/toast';
import {IBasket, BasketService} from '../../models/basket';

export class BasketController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: IBasket;
  customer: string;
  address: string;
  ordersForReview: IOrder[];
  user: IUser;

  constructor(
    private $state: IBasketState,
    private $scope: IScope,
    private $log: ILogService,
    private lBasketService: BasketService,
    private lOrderService: OrderService,
    private lToastService: ToastService,
    private lUserService: UserService
  ) {
    'ngInject';

    this.initUser();
    this.initBasket();
  }

  // dom event handlers --------------------------------------------------------
  makeOrder(): void {
    this.lUserService.sync(this.user)
      .then(user => {
        this.updateUserInCache(user);
        return this.lOrderService.placeOrders(this.basket.orders);
      })
      .then(() => {
        this.lToastService.show('Спасибо! Заказ размещен!');
        this.clearBasket();
      })
      .catch(err => {
        this.lToastService.show('Ошибка! Не удалось разместить заказ');
      })
      .finally(() => {
        this.$state.go('payment');
      });
  }

  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  removeFromBasket(order: IOrder) {
    this.basket = this.lBasketService.removeOrderFrom(this.basket, order);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  restoreToBasket(order: IOrder) {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  onUserChanged(user: IUser): void {
    this.user = user;

    this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, user);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  // view helpers --------------------------------------------------------------
  hasData(): boolean {
    return Boolean(this.basket.orders.length);
  }

  isEmpty(): boolean {
    return !this.hasData();
  }

  isOrdersValid(): boolean {
    return this.lOrderService.isValidAll(this.basket.orders);
  }

  // private init --------------------------------------------------------------
  private initBasket(): void {
    this.lBasketService.fetchBasket()
      .then(basket => {
        this.basket = this.lBasketService.setUserToEachOrderIn(basket, this.user);
      })
      .catch(err => {
        this.$log.info('BasketController: Unable to fetch basket. Create new empty one');

        this.basket = this.lBasketService.createEmptyBasket();
        this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, this.user);
      })
      .finally(() => {
        this.initOrdersForReview();
        this.lBasketService.storeBasketInStorage(this.basket);
      });
  }

  private initOrdersForReview(): void {
    this.ordersForReview = cloneDeep(this.basket.orders);
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  private clearBasket(): void {
    this.basket = this.lBasketService.clearBasket(this.basket);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  private updateUserInCache(user: IUser): void {
    this.user = user;
    this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, user);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const BasketComponent = {
  template: require('./basket.html'),
  controller: BasketController,
  controllerAs: 'vm'
};

