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
  cardNumber: string;
  cardHolder: string;
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
    this.initCardInfo();
  }

  // dom event handlers --------------------------------------------------------
  makeOrder(): void {
    this.lOrderService.placeOrders(this.basket.orders)
      .then(res => {
        this.lToastService.show('Спасибо! Заказ размещен!');
        this.clearBasket();
      })
      .catch(err => {
        this.lToastService.show('Ошибка! Не удалось разместить заказ');
      })
      .finally(() => {
        this.$state.go('week-menu');
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
    if (!user) {
      return;
    }

    this.user = user;

    this.lUserService.sync(this.user);

    this.basket = this.setUserInfoToEachOrderIn(this.basket);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  // view helpers --------------------------------------------------------------
  totalToPay(): number {
    return this.lOrderService.calcPriceForAll(this.basket.orders);
  }

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
        this.basket = this.setUserInfoToEachOrderIn(basket);
      })
      .catch(err => {
        this.$log.info('BasketController: Unable to fetch basket. Create new empty one');

        this.basket = this.lBasketService.createEmptyBasket();
        this.basket = this.setUserInfoToEachOrderIn(this.basket);
      })
      .finally(() => {
        this.initOrdersForReview();
        this.lBasketService.storeBasketInStorage(this.basket);
      });
  }

  private setUserInfoToEachOrderIn(inputBasket: IBasket): IBasket {
    let basket = this.lBasketService.setCustomerForAllOrdersIn(inputBasket, this.user.fullName);
    return this.lBasketService.setAddressForAllOrdersIn(basket, this.user.address);
  }

  private initOrdersForReview(): void {
    this.ordersForReview = cloneDeep(this.basket.orders);
  }

  private initCardInfo(): void {
    this.cardHolder = 'Иванов Иван Иванович';
    this.cardNumber = '1234-5678-8765-4321';
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  private clearBasket(): void {
    this.basket = this.lBasketService.clearBasket(this.basket);
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

