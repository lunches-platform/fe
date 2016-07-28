import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';
import {IBasketState} from '../../../routes';

import {IOrder} from '../../models/order';
import {LineItemService} from '../line-item/line-item.service';

// output bindings interfaces --------------------------------------------------
// todo: combine into one?
interface ITriggerCancelEvent {
  (arg: { order: IOrder }): void;
}

interface ITriggerRestoreEvent {
  (arg: { order: IOrder }): void;
}

interface ITriggerChangeEvent {
  (arg: { order: IOrder }): void;
}

export class MyOrdersItemController {
  // bindings ------------------------------------------------------------------

  // input
  order: IOrder;

  // output
  triggerCancelEvent: ITriggerCancelEvent;
  triggerRestoreEvent: ITriggerRestoreEvent;
  triggerChangeEvent: ITriggerChangeEvent;

  // internal
  canceled: boolean;

  constructor(
    private $state: IBasketState,
    private lLineItemService: LineItemService
  ) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  cancel(): void {
    this.canceled = true;
    this.triggerCancelEvent({order: this.order});
  }

  restore(): void {
    this.canceled = false;
    this.triggerRestoreEvent({order: this.order});
  }

  change(): void {
    this.canceled = false;
    this.triggerChangeEvent({order: this.order});
  }

  // view helpers --------------------------------------------------------------
  isCanceled(): boolean {
    return this.canceled;
  }

  isExist(): boolean {
    return !this.canceled;
  }

  calcPrice(): number {
    return this.lLineItemService.calcPriceForAll(this.order.items);
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
}

// component definition --------------------------------------------------------
export const MyOrdersItemComponent: IComponentOptions = {
  template: require('./my-orders-item.html'),
  controller: MyOrdersItemController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerCancelEvent: '&onCanceled',
    triggerRestoreEvent: '&onRestored',
    triggerChangeEvent: '&onChanged'
  }
};
