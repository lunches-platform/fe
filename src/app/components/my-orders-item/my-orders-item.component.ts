import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';
import * as moment from 'moment';

import {IChangesList} from '../../../config';

import {IOrder, OrderService} from '../../models/order';
import {ProductTypeUrls} from '../../models/product';

// internal types --------------------------------------------------------------
interface ITriggerChangeEvent {
  (arg: { order: IOrder, oldOrder: IOrder }): void;
}

interface ITriggerNewOrderEvent {
  (): void;
}

export class MyOrdersItemController {
  // bindings ------------------------------------------------------------------

  // input
  order: IOrder;

  // output
  triggerChangeEvent: ITriggerChangeEvent;
  triggerNewOrderEvent: ITriggerNewOrderEvent;

  // internal

  constructor(private lOrderService: OrderService) {
    'ngInject';
  }
  // dom event handlers --------------------------------------------------------
  onNewOrder(): void {
    this.triggerNewOrderEvent();
  }

  onCancel(): void {
    this.triggerChangeEvent({order: this.lOrderService.cancel(this.order), oldOrder: this.order});
  }

  onRestore(): void {
    this.triggerChangeEvent({order: this.lOrderService.restore(this.order), oldOrder: this.order});
  }

  // view helpers --------------------------------------------------------------
  isCanceled(): boolean {
    return this.order.canceled;
  }

  isExist(): boolean {
    return !this.isCanceled();
  }

  isCancelAllowed(): boolean {
    return this.isCurrentDateBeforeShipmentDate();
  }

  coverUrl(): string {
    return this.lOrderService.getCoverOf(this.order);
  }

  productTypeToIconUrl(type: string): string {
    return ProductTypeUrls[type];
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    if (changes['order']) { // tslint:disable-line:no-string-literal
      this.onInputOrderChanged(this.order);
    }
  }

  // private event handlers ----------------------------------------------------
  private onInputOrderChanged(order: IOrder) {
    this.order = cloneDeep(order);
  }

  // private helpers -----------------------------------------------------------
  private isCurrentDateBeforeShipmentDate(): boolean {
    return moment().isBefore(moment(this.order.shipmentDate));
  }
}

// component definition --------------------------------------------------------
export const MyOrdersItemComponent: IComponentOptions = {
  template: require('./my-orders-item.html'),
  controller: MyOrdersItemController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerChangeEvent: '&onChange',
    triggerNewOrderEvent: '&onNewOrder'
  }
};
