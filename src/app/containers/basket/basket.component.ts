import {OrderService} from '../../models/order.service';
import {Basket, BasketService} from './basket.service';
import {IBasketState} from '../../../routes';
import {IScope, ILogService} from 'angular';
import * as angular from 'angular';

type IToastService = angular.material.IToastService;

export class BasketController {
  // internal bindings
  basket: Basket;
  customer: string;
  address: string;
  cardNumber: string;
  cardHolder: string;

  private toastPosition = 'top right';
  private toastHideDelay = 5000;

  constructor(
    private $state: IBasketState,
    private $scope: IScope,
    private $log: ILogService,
    private $mdToast: IToastService,
    private lBasketService: BasketService,
    private lOrderService: OrderService
  ) {
    'ngInject';

    this.initBasket();
    this.initCustomer();
    this.initAddress();
    this.initCardInfo();
  }

  totalToPay(): number {
    return this.lOrderService.calcPriceForAll(this.basket.orders);
  }

  makeOrder(): void {
    this.lOrderService.placeOrders(this.basket.orders)
      .then(res => {
        this.showToast('Orders have been placed!');
        this.clearBasket();
      })
      .catch(err => {
        console.error(err);
        this.showToast('Error! Unable to place orders');
      })
      .finally(() => {
        this.$state.go('week-menu');
      });
  }

  isOrdersValid(): boolean {
    return this.lOrderService.isValidAll(this.basket.orders);
  }

  goToWeekMenu() {
    this.$state.go('week-menu');
  }

  hasData(): boolean {
    return Boolean(this.basket.orders.length);
  }

  isEmpty(): boolean {
    return !this.hasData();
  }

  private clearBasket() {
    this.basket = this.lBasketService.clearBasket(this.basket);
    this.lBasketService.storeBasketInStorage(this.basket);
  }

  private initBasket() {
    this.lBasketService.fetchBasket()
      .then(basket => this.basket = basket)
      .catch(err => {
        this.$log.info('BasketController: Unable to fetch basket. Create new empty one');

        this.basket = new Basket();
      });
  }

  private showToast(msg: string): void {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(msg)
        .position(this.toastPosition)
        .hideDelay(this.toastHideDelay)
    );
  }

  private onCustomerChanged(customer: string) {
    this.basket = this.lBasketService.setCustomerForAllOrdersIn(this.basket, customer);
  }

  private onAddressChanged(address: string) {
    this.basket = this.lBasketService.setAddressForAllOrdersIn(this.basket, address);
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
}

export const BasketComponent = {
  template: require('./basket.html'),
  controller: BasketController,
  controllerAs: 'vm'
};

