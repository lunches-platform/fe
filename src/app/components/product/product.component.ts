import {Product as ProductItem} from './product.service';
import {OrderService} from '../../models/order.service';
import {ISize} from '../size-selector/size-selector.component';
import {cloneDeep} from 'lodash';

interface ITriggerToggleEvent {
  (arg: { product: ProductItem, checked: boolean, size: ISize, amount: number }): void;
}

interface ITriggerSizeChangeEvent {
  (arg: { product: ProductItem, size: ISize }): void;
}

interface ITriggerAmountChangeEvent {
  (arg: { product: ProductItem, amount: number }): void;
}

// todo: add types
class ProductControler {
  product: ProductItem;
  triggerToggle: ITriggerToggleEvent;
  triggerSizeChange: ITriggerSizeChangeEvent;
  triggerAmountChange: ITriggerAmountChangeEvent;
  checked = false;

  defaultSize: ISize;
  selectedSize: ISize;
  selectedAmount = 1;

  constructor(private lOrderService: OrderService) {
    'ngInject';

    this.product = cloneDeep(this.product);
    this.initSelectedSize();
  }

  calcWeight(): number {
    return this.lOrderService.calcWeightFor(this.product, this.selectedSize, this.selectedAmount);
  }

  onToggle() {
    this.triggerToggle({
      product: this.product,
      checked: this.checked,
      size: this.selectedSize,
      amount: this.selectedAmount
    });
  }

  onSizeSelected(size: ISize) {
    this.selectedSize = size;

    this.triggerSizeChange({
      product: this.product,
      size: size
    });
  }

  onAmountChanged(amount: number) {
    this.selectedAmount = amount;

    this.triggerAmountChange({
      product: this.product,
      amount: amount
    });
  }

  private initSelectedSize() {
    this.defaultSize = {
      id: 'small',
      title: 'Small'
    };

    this.selectedSize = this.defaultSize;
  }
}

export const ProductComponent = {
  templateUrl: 'app/components/product/product.html',
  controller: ProductControler,
  controllerAs: 'vm',
  bindings: {
    product: '<',
    triggerToggle: '&onToggled',
    triggerSizeChange: '&onSizeChanged',
    triggerAmountChange: '&onAmountChanged'
  }
};
