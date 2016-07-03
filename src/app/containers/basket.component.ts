import {Order, OrderService} from '../models/order.service';
import {cloneDeep} from 'lodash';
import {IBasketState} from '../../routes';

export class BasketController {
  // input bindings
  order: Order;

  // output bindings

  // internal bindings
  customer: string;
  address: string;

  constructor(private $state: IBasketState, private $scope: ng.IScope, private lOrderService: OrderService) {
    'ngInject';

    if (!this.isStateValid()) {
      this.$state.go('week-menu');
    }

    this.initOrder();
    this.initCustomer();
    this.initAddress();
  }

  totalToPay(): number {
    return this.lOrderService.calcPriceForOrder(this.order);
  }

  makeOrder(): void {
    this.lOrderService.makeOrder(this.order);
  }

  private onCustomerChanged(customer: string) {
    this.order = this.lOrderService.setCustomer(customer, this.order);
  }

  private onAddressChanged(address: string) {
    this.order = this.lOrderService.setAddress(address, this.order);
  }

  private initOrder(): void {
    this.order = cloneDeep(this.$state.params.order);
  }

  private initCustomer() {
    this.$scope.$watch(() => this.customer, this.onCustomerChanged.bind(this));
  }

  private initAddress() {
    this.$scope.$watch(() => this.address, this.onAddressChanged.bind(this));
  }

  private isStateValid() {
    return this.$state.params.order;
  }
}

export const BasketComponent = {
  templateUrl: 'app/containers/basket.html',
  controller: BasketController,
  controllerAs: 'vm'
};
