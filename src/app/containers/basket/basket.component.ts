import {cloneDeep} from 'lodash';
import * as angular from 'angular';
import {IScope, ILogService} from 'angular';

import {IBasketState} from '../../../routes';

import {IOrder, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';
import {IBasket, BasketService} from './basket.service';

type IToastService = angular.material.IToastService;

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

  private toastPosition = 'top right';
  private toastHideDelay = 5000;

  constructor(
    private $state: IBasketState,
    private $scope: IScope,
    private $log: ILogService,
    private $mdToast: IToastService,
    private lBasketService: BasketService,
    private lOrderService: OrderService,
    private lUserService: UserService
  ) {
    'ngInject';

    this.initUser();
    this.initBasket();
    this.initCustomer();
    this.initAddress();
    this.initCardInfo();
  }

  // dom event handlers --------------------------------------------------------
  makeOrder(): void {
    this.lOrderService.placeOrders(this.basket.orders)
      .then(res => {
        this.showToast('Orders have been placed!');
        this.clearBasket();
      })
      .catch(err => {
        this.showToast('Error! Unable to place orders');
      })
      .finally(() => {
        this.$state.go('week-menu');
      });
  }

  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  removeFromBasket(order: IOrder) {
    this.basket = this.lBasketService.removeOrderFrom(this.basket, order);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  restoreToBasket(order: IOrder) {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
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
      .then(basket => this.basket = basket)
      .catch(err => {
        this.$log.info('BasketController: Unable to fetch basket. Create new empty one');

        this.basket = this.lBasketService.createEmptyBasket();
        this.lBasketService.storeBasketInStorage(this.basket);
      })
      .finally(() => {
        this.initOrdersForReview();
      });
  }

  private initOrdersForReview(): void {
    this.ordersForReview = cloneDeep(this.basket.orders);
  }

  private initCustomer(): void {
    this.$scope.$watch(() => this.customer, this.onCustomerChanged.bind(this));
  }

  private initAddress(): void {
    this.$scope.$watch(() => this.address, this.onAddressChanged.bind(this));
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

  private showToast(msg: string): void {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(msg)
        .position(this.toastPosition)
        .hideDelay(this.toastHideDelay)
    );
  }

  // private event handlers ----------------------------------------------------
  private onCustomerChanged(customer: string): void {
    if (!customer) {
      return;
    }

    this.user = this.lUserService.updateFullNameFor(this.user, customer);
    this.lUserService.sync(this.user);
    this.basket = this.lBasketService.setCustomerForAllOrdersIn(this.basket, customer);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  private onAddressChanged(address: string): void {
    this.user = this.lUserService.updateAddressFor(this.user, address);
    this.lUserService.sync(this.user);
    this.basket = this.lBasketService.setAddressForAllOrdersIn(this.basket, address);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

}

// component definition --------------------------------------------------------
export const BasketComponent = {
  template: require('./basket.html'),
  controller: BasketController,
  controllerAs: 'vm'
};

