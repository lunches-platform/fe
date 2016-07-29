import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';
import {IBasketState} from '../../../routes';

import {IOrder} from '../../models/order';
import {LineItemService} from '../line-item/line-item.service';

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
    private $state: IBasketState,
    private lLineItemService: LineItemService
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
    this.$state.go('week-menu');
  }

  // view helpers --------------------------------------------------------------
  isRemoved(): boolean {
    return this.removed;
  }

  isExist(): boolean {
    return !this.removed;
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
