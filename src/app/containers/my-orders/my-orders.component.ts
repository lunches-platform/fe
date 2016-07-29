import {ILogService, IComponentOptions} from 'angular';

import {IMyOrdersState} from '../../../routes';

import {IOrder, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';
import {ToastService} from '../../models/toast';

export class MyOrdersController {
  // bindings ------------------------------------------------------------------
  // internal
  orders: IOrder[];
  user: IUser;

  private loading: boolean;

  constructor(
    private $state: IMyOrdersState,
    private $log: ILogService,
    private lOrderService: OrderService,
    private lUserService: UserService,
    private lToastService: ToastService
  ) {
    'ngInject';

    this.initLoading();
    this.initUser();
    this.initOrders();
  }

  // dom event handlers --------------------------------------------------------
  onChange(order: IOrder, oldOrder: IOrder): void {
    this.update(order);

    this.lOrderService.syncOrderFor(this.user, order)
      .catch(err => {
        this.lToastService.show('Unable to update order');
        this.update(oldOrder);
      });
  }

  onNewOrder(): void {
    this.goToWeekMenu();
  }

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

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  private update(order: IOrder): void {
    this.orders = this.lOrderService.updateOrderIn(this.orders, order);
  }

  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const MyOrdersComponent: IComponentOptions = {
  template: require('./my-orders.html'),
  controller: MyOrdersController,
  controllerAs: 'vm'
};

