import {Order, OrderService} from '../models/order.service';
import {cloneDeep} from 'lodash';
import {IBasketState} from '../../routes';
import {IScope} from 'angular';

type IToastService = angular.material.IToastService;

export class BasketController {
  // input bindings
  order: Order;

  // internal bindings
  customer: string;
  address: string;
  cardNumber: string;
  cardHolder: string;

  private toastPosition = 'top right';
  private toastHideDelay = 5000;

  constructor(
    private $state: IBasketState,
    private $scope: IScope,
    private $mdToast: IToastService,
    private lOrderService: OrderService
  ) {
    'ngInject';

    this.initOrder();
    this.initCustomer();
    this.initAddress();
    this.initCardInfo();
  }

  totalToPay(): number {
    return this.lOrderService.calcPriceForOrder(this.order);
  }

  makeOrder(): void {
    this.lOrderService.makeOrder(this.order)
      .then(res => {
        this.showToast('Order has been placed!');
      })
      .catch(err => {
        console.error(err);
        this.showToast('Error! Unable to place order');
      })
      .finally(() => {
        this.$state.go('week-menu');
      });
  }

  isOrderValid(): boolean {
    return this.lOrderService.isValid(this.order);
  }

  goToWeekMenu() {
    this.$state.go('week-menu');
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
    this.order = this.lOrderService.setCustomer(customer, this.order);
  }

  private onAddressChanged(address: string) {
    this.order = this.lOrderService.setAddress(address, this.order);
  }

  private initOrder(): void {
    if (this.isOrderExist()) {
      this.order = cloneDeep(this.$state.params.order);
    } else {
      this.order = new Order();
    }
  }

  private initCustomer(): void {
    this.$scope.$watch(() => this.customer, this.onCustomerChanged.bind(this));
  }

  private initAddress(): void {
    this.$scope.$watch(() => this.address, this.onAddressChanged.bind(this));
  }

  private isOrderExist(): boolean {
    return Boolean(this.$state.params.order);
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

