import {ILogService, IComponentOptions} from 'angular';

import {IMyOrdersState} from '../../../routes';

import {IOrder, OrderService} from '../../models/order';

export class MyOrdersController {
  // bindings ------------------------------------------------------------------
  // internal
  orders: IOrder[];

  private loading: boolean;

  constructor(
    private $state: IMyOrdersState,
    private $log: ILogService,
    private lOrderService: OrderService
  ) {
    'ngInject';

    this.initOrders();
    this.initLoading();
  }

  // dom event handlers --------------------------------------------------------
  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  // view helpers --------------------------------------------------------------
  hasData(): boolean {
    return Boolean(this.orders.length);
  }

  isEmpty(): boolean {
    return !this.hasData();
  }

  isLoading(): boolean {
    return this.loading;
  }

  // private init --------------------------------------------------------------
  private initOrders(): void {
    this.orders = [];
    this.loading = true;

    this.lOrderService.fetchMyOrders()
      .then(orders => {
        this.orders = orders;
      })
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
  }

  private initLoading(): void {
    this.loading = true;
  }
  // private helpers -----------------------------------------------------------
  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const MyOrdersComponent: IComponentOptions = {
  template: require('./my-orders.html'),
  controller: MyOrdersController,
  controllerAs: 'vm'
};

