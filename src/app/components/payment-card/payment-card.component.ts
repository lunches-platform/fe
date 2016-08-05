import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

import {IOrder, OrderService} from '../../models/order';

export class PaymentCardController {
  // bindings ------------------------------------------------------------------
  // input
  inputOrders: IOrder[];

  // internal
  cardNumber: string;
  cardHolder: string;

  constructor(private lOrderService: OrderService) {
    'ngInject';

    this.initCardInfo();
  }

  // view helpers --------------------------------------------------------------
  totalToPay(): number {
    return this.lOrderService.calcPriceForAll(this.inputOrders);
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    /* tslint:disable:no-string-literal */
    if (changes['orders']) {
      this.onInputOrdersChanged(changes['orders'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initCardInfo(): void {
    this.cardHolder = 'Иванов Иван Иванович';
    this.cardNumber = '1234-5678-8765-4321';
  }

  // private event handlers ----------------------------------------------------
  private onInputOrdersChanged(orders: IOrder[]) {
    this.inputOrders = cloneDeep(orders);
  }
}

// component definition --------------------------------------------------------
export const PaymentCardComponent: IComponentOptions = {
  template: require('./payment-card.html'),
  controller: PaymentCardController,
  controllerAs: 'vm',
  bindings: {
    orders: '<'
  }
};

