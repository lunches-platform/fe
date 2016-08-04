import {ILogService, IComponentOptions} from 'angular';
import * as moment from 'moment';

import {IMyOrdersState} from '../../../routes';
import {SHORT_DATE_FORMAT} from '../../../config';

import {IOrder, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';
import {ToastService} from '../../models/toast';

import {IDateRange} from '../../components/date-range-selector/date-range-selector.component';

export class MyOrdersController {
  // bindings ------------------------------------------------------------------
  // internal
  orders: IOrder[];
  user: IUser;
  selectedDateRange: IDateRange;

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
    this.initDateRangeSelector();
    this.initUser();
    this.initOrders();
  }

  // dom event handlers --------------------------------------------------------
  onItemChange(order: IOrder, oldOrder: IOrder): void {
    this.update(order);

    this.lOrderService.syncOrderFor(this.user, order)
      .catch(err => {
        this.lToastService.show('Ошибка обновления заказа');
        this.update(oldOrder);
      });
  }

  onDateRangeChanged(dateRange: IDateRange): void {
    this.selectedDateRange = dateRange;
    this.fetchOrders();
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

    this.fetchOrders();
  }

  private initLoading(): void {
    this.loading = true;
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  private initDateRangeSelector(): void {
    const startOfPrevWeek = moment().subtract(1, 'weeks').startOf('week').format(SHORT_DATE_FORMAT);
    const endOfNextWeek = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

    this.selectedDateRange = {
      startDate: startOfPrevWeek,
      endDate: endOfNextWeek
    };
  }

  // private helpers -----------------------------------------------------------
  private update(order: IOrder): void {
    this.orders = this.lOrderService.updateOrderIn(this.orders, order);
  }

  private fetchOrders(): void {
    this.loading = true;

    this.lOrderService.fetchMyOrders(this.selectedDateRange.startDate, this.selectedDateRange.endDate)
      .then(orders => {
        this.orders = orders;
      })
      .catch(err => this.$log.error(err))
      .finally(() => this.loading = false);
    }

  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const MyOrdersComponent: IComponentOptions = {
  template: require('./my-orders.html'),
  controller: MyOrdersController,
  controllerAs: 'vm'
};

