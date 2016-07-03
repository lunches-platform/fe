import {LineItem} from './line-item.service';
import {LineItemService} from './line-item.service';
import {ISize} from '../size-selector/size-selector.component';
import {cloneDeep} from 'lodash';

interface ITriggerChangeEvent {
  (arg: { item: LineItem }): void;
}

export class LineItemController {
  // input bindings
  lineItem: LineItem;

  // output bindings
  triggerChangeEvent: ITriggerChangeEvent;

  private defaultSize: ISize;

  constructor(private lLineItemService: LineItemService) {
    'ngInject';

    this.initLineItem();
    this.initSelectedSize();
  }

  calcWeight(): number {
    return this.lLineItemService.calcWeightFor(this.lineItem);
  }

  onToggled(): void {
    this.triggerChangeEvent({item: this.lineItem});
  }

  onSizeSelected(size: ISize): void {
    this.lineItem.size = size;

    this.triggerChangeEvent({item: this.lineItem});
  }

  onQuantityChanged(quantity: number): void {
    this.lineItem.quantity = quantity;

    this.triggerChangeEvent({item: this.lineItem});
  }

  private initLineItem() {
    this.lineItem = cloneDeep(this.lineItem);
  }

  private initSelectedSize(): void {
    this.defaultSize = {
      id: 'small',
      title: 'Small'
    };

    this.lineItem.size = this.lineItem.size || cloneDeep(this.defaultSize);
  }
}

export const LineItemComponent = {
  templateUrl: 'app/components/line-item/line-item.html',
  controller: LineItemController,
  controllerAs: 'vm',
  bindings: {
    lineItem: '<',
    triggerChangeEvent: '&onChanged',
  }
};
