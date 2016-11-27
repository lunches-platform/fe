import {ILogService, IComponentOptions} from 'angular';
import * as moment from 'moment';

type ISidenavService = angular.material.ISidenavService;

import {RouterWrapper} from '../../../app/ng1';
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
    private router: RouterWrapper,
    private $log: ILogService,
    private $mdSidenav: ISidenavService,
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
  onCancel(order: IOrder, oldOrder: IOrder): void {
    this.updateInCachedList(order);

    this.lOrderService.cancelInDb(order)
      .catch(err => {
        this.lToastService.show('Не удалось отменить заказ');
        this.updateInCachedList(oldOrder);
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
    this.router.navigate(['/week-menu']);
  }

  goToBasket(): void {
    this.router.navigate(['/basket']);
  }

  onPay(order: IOrder): void {
    this.router.navigate(['/payment']);
  }

  onToggleSidebar(): void {
    this.$mdSidenav('left').toggle();
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
  private updateInCachedList(order: IOrder): void {
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

