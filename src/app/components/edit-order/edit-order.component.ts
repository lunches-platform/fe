import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

import {IOrder, OrderService} from '../../models/order';
import {ILineItem} from '../../models/line-item';

// internal types --------------------------------------------------------------
interface ITriggerChangeEvent {
  (arg: { order: IOrder }): void;
}

export class EditOrderController {
  // bindings ------------------------------------------------------------------

  // input
  order: IOrder;

  // output
  triggerChangeEvent: ITriggerChangeEvent;

  // internal
  draftOrder: IOrder;
  draftOrderItems: ILineItem[];

  constructor(private lOrderService: OrderService) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  onItemChanged(item: ILineItem): void {
    this.draftOrder = this.lOrderService.updateItemIn(this.draftOrder, item);
  }

  onItemToggled(item: ILineItem, checked: boolean): void {
    if (checked) {
      this.draftOrder = this.lOrderService.addItemTo(this.draftOrder, item);
    } else {
      this.draftOrder = this.lOrderService.removeItemFrom(this.draftOrder, item);
    }
  }

  onSave(): void {
    this.triggerChangeEvent({order: this.draftOrder});
  }

  // view helpers --------------------------------------------------------------

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    /* tslint:disable:no-string-literal */
    if (changes['order']) {
      this.onInputOrderChanged(changes['order'].currentValue);
    }
    /* tslint:disable:no-string-literal */
  }

  private initDraftOrder(): void {
    this.draftOrder = cloneDeep(this.order);
    this.draftOrderItems = cloneDeep(this.order.items);
  }

  // private event handlers ----------------------------------------------------
  private onInputOrderChanged(order: IOrder) {
    this.order = cloneDeep(order);

    this.initDraftOrder();
  }
}

// component definition --------------------------------------------------------
export const EditOrderComponent: IComponentOptions = {
  template: require('./edit-order.html'),
  controller: EditOrderController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerChangeEvent: '&onChange'
  }
};
