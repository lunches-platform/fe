import {ILineItem, LineItemService} from './line-item.service';
import {ISize} from '../size-selector/size-selector.component';
import {IScope} from 'angular';
import {cloneDeep} from 'lodash';

interface ITriggerChangeEvent {
  (arg: { item: ILineItem }): void;
}

interface ITriggerToggleEvent {
  (arg: { item: ILineItem, checked: boolean }): void;
}

export class LineItemController {
  // input bindings
  lineItem: ILineItem;

  // output bindings
  triggerChangeEvent: ITriggerChangeEvent;
  triggerToggleEvent: ITriggerToggleEvent;

  // internal bindings
  checked: boolean;

  private defaultSize: ISize;

  constructor(private $scope: IScope, private lLineItemService: LineItemService) {
    'ngInject';

    this.initCheckedState();
    this.initLineItem();
    this.initSelectedSize();
  }

  calcWeight(): number {
    return this.lLineItemService.calcWeightFor(this.lineItem);
  }

  onToggled(checked: boolean): void {
    this.triggerToggleEvent({item: this.lineItem, checked: checked});
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
      id: 'medium',
      title: 'Medium'
    };

    this.lineItem.size = this.lineItem.size || cloneDeep(this.defaultSize);
  }

  private initCheckedState() {
    this.checked = true;
    this.$scope.$watch(() => this.checked, this.onToggled.bind(this));
  }
}

export const LineItemComponent = {
  template: require('./line-item.html'),
  controller: LineItemController,
  controllerAs: 'vm',
  bindings: {
    lineItem: '<',
    triggerChangeEvent: '&onChanged',
    triggerToggleEvent: '&onToggled',
  }
};
