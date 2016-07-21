import {cloneDeep, filter} from 'lodash';

import {Order} from '../../models/order.service';
import {LineItemService} from '../line-item/line-item.service';
import {IBasketState} from '../../../routes';

// output bindings interfaces --------------------------------------------------
interface ITriggerRemoveEvent {
  (arg: { order: Order }): void;
}

interface ITriggerRestoreEvent {
  (arg: { order: Order }): void;
}

export class BasketOrderController {
  // bindings ------------------------------------------------------------------

  // input
  order: Order;

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
    return this.lLineItemService.calcPriceForAll(
      filter(this.order.items, ['checked', true])
    );
  }

  // private init --------------------------------------------------------------
  // todo: add typings
  $onChanges(changes) {
    if (changes.order) {
      this.onInputOrderChanged(this.order);
    }
  }

  // private event handlers ----------------------------------------------------
  private onInputOrderChanged(order: Order) {
    this.order = cloneDeep(order);
  }
}

// component definition --------------------------------------------------------
export const BasketOrderComponent = {
  template: require('./basket-order.html'),
  controller: BasketOrderController,
  controllerAs: 'vm',
  bindings: {
    order: '<',
    triggerRemoveEvent: '&onRemove',
    triggerRestoreEvent: '&onRestore'
  }
};
