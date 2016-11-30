import { cloneDeep } from 'lodash';
import { IComponentOptions, IOnChangesObject } from 'angular';

import { RouterWrapper } from '../../../app/ng1';

import { IOrder } from '../../models/order';

// internal types --------------------------------------------------------------
interface ITriggerRemoveEvent {
  (arg: { order: IOrder }): void;
}

interface ITriggerRestoreEvent {
  (arg: { order: IOrder }): void;
}

export class BasketOrderController {
  // bindings ------------------------------------------------------------------

  // input
  order: IOrder;

  // output
  triggerRemoveEvent: ITriggerRemoveEvent;
  triggerRestoreEvent: ITriggerRestoreEvent;

  // internal
  removed: boolean;

  constructor(
    private router: RouterWrapper
  ) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  remove(): void {
    this.removed = true;
    this.triggerRemoveEvent({order: this.order});
  }

  restore(): void {
    this.removed = false;
    this.triggerRestoreEvent({order: this.order});
  }

  addAnother(): void {
    this.router.navigate(['/week-menu']);
  }

  // view helpers --------------------------------------------------------------
  isRemoved(): boolean {
    return this.removed;
  }

  isExist(): boolean {
    return !this.removed;
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IOnChangesObject) {
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
export const BasketOrderComponent: IComponentOptions = {
  template: require('./basket-order.html'),
  controller: BasketOrderController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerRemoveEvent: '&onRemove',
    triggerRestoreEvent: '&onRestore'
  }
};
