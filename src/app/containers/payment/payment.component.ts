import {sumBy} from 'lodash';
import {ILogService} from 'angular';

import {IOrder, IPaymentCard, PaymentType, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';

export class PaymentController {
  // bindings ------------------------------------------------------------------
  // internal
  orders: IOrder[];
  user: IUser;
  paymentCard: IPaymentCard;
  paymentType: PaymentType;

  private loading: boolean;

  constructor(private $log: ILogService, private lOrderService: OrderService, private lUserService: UserService) {
    'ngInject';

    this.initLoading();
    this.initPaymentType();
    this.initUser();
    this.initPaymentCard();
    this.initUnpaidOrders();
  }

  // dom event handlers --------------------------------------------------------

  // view helpers --------------------------------------------------------------
  totalToPay(): number {
    return sumBy(this.orders, 'price');
  }

  hasData(): boolean {
    return Boolean(this.orders.length);
  }

  isLoading(): boolean {
    return this.loading;
  }

  isEmpty(): boolean {
    return !this.hasData();
  }

  // private init --------------------------------------------------------------
  private initPaymentType(): void {
    this.paymentType = 'card';
  }

  private initLoading(): void {
    this.loading = true;
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  private initPaymentCard(): void {
    this.lOrderService.fetchPaymentCard()
      .then(paymentCard => this.paymentCard = paymentCard)
      .catch(err => {
        this.$log.warn('PaymentController: Unable to fetch payment card info', err);
      });
  }

  private initUnpaidOrders(): void {
    this.orders = [];
    this.loading = true;


    this.lOrderService.fetchUnpaidOrdersFor(this.user)
      .then(orders => this.orders = orders)
      .catch(err => {
        this.$log.warn('PaymentController: Unable to fetch unpaid orders', err);
      })
      .finally(() => this.loading = false);
  }

  // private helpers -----------------------------------------------------------

  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const PaymentComponent = {
  template: require('./payment.html'),
  controller: PaymentController,
  controllerAs: 'vm'
};

