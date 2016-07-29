import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

import {IOrder} from '../../models/order';

enum Mode {
  View,
  Edit
}

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
  mode: Mode;

  constructor() {
    this.initMode();
  }

  // dom event handlers --------------------------------------------------------
  onChange(order: IOrder): void {
    this.triggerChangeEvent({order: order, oldOrder: this.order});
    this.mode = Mode.View;
  }

  onNewOrder(): void {
    this.triggerNewOrderEvent();
  }

  onEditOrder(): void {
    this.mode = Mode.Edit;
  }

  // view helpers --------------------------------------------------------------
  isViewMode(): boolean {
    return this.mode === Mode.View;
  }

  isEditMode(): boolean {
    return this.mode === Mode.Edit;
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    if (changes['order']) { // tslint:disable-line:no-string-literal
      this.onInputOrderChanged(this.order);
    }
  }

  private initMode(): void {
    this.mode = Mode.View;
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
    triggerChangeEvent: '&onChange',
    triggerNewOrderEvent: '&onNewOrder'
  }
};
