import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';
import * as moment from 'moment';

import {IChangesList} from '../../../config';

import {IOrder, OrderService} from '../../models/order';

// internal types --------------------------------------------------------------
interface ITriggerChangeEvent {
  (arg: { order: IOrder }): void;
}

interface ITriggerNewOrderEvent {
  (): void;
}

interface ITriggerEditOrderEvent {
  (): void;
}

export class ViewOrderController {
  // bindings ------------------------------------------------------------------

  // input
  order: IOrder;

  // output
  triggerChangeEvent: ITriggerChangeEvent;
  triggerNewOrderEvent: ITriggerNewOrderEvent;
  triggerEditOrderEvent: ITriggerEditOrderEvent;

  constructor(private lOrderService: OrderService) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  onCancel(): void {
    this.triggerChangeEvent({order: this.lOrderService.cancel(this.order)});
  }

  onRestore(): void {
    this.triggerChangeEvent({order: this.lOrderService.restore(this.order)});
  }

  onNewOrder(): void {
    this.triggerNewOrderEvent();
  }

  onEditOrder(): void {
    this.triggerEditOrderEvent();
  }

  // view helpers --------------------------------------------------------------
  isCanceled(): boolean {
    return this.order.canceled;
  }

  isExist(): boolean {
    return !this.isCanceled();
  }

  needToShowCancelButton(): boolean {
    return this.isCurrentDateBeforeShipmentDate();
  }

  needToShowEditButton(): boolean {
    return this.isCurrentDateBeforeShipmentDate();
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

  private isCurrentDateBeforeShipmentDate(): boolean {
    return moment().isBefore(moment(this.order.shipmentDate));
  }
}

// component definition --------------------------------------------------------
export const ViewOrderComponent: IComponentOptions = {
  template: require('./view-order.html'),
  controller: ViewOrderController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerChangeEvent: '&onChange',
    triggerNewOrderEvent: '&onNewOrder',
    triggerEditOrderEvent: '&onEditOrder'
  }
};
