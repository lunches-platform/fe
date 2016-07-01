import {Product as ProductItem} from './product.service';
import {OrderService} from '../../models/order.service';
import {ISize} from '../size-selector/size-selector.component';
import {cloneDeep} from 'lodash';

interface ITriggerToggleEvent {
  (arg: { product: ProductItem, checked: boolean, size: ISize, quantity: number }): void;
}

interface ITriggerSizeChangeEvent {
  (arg: { product: ProductItem, size: ISize }): void;
}

interface ITriggerQuantityChangeEvent {
  (arg: { product: ProductItem, quantity: number }): void;
}

// todo: add types
class ProductControler {
  product: ProductItem;
  triggerToggle: ITriggerToggleEvent;
  triggerSizeChange: ITriggerSizeChangeEvent;
  triggerQuantityChange: ITriggerQuantityChangeEvent;
  checked = false;

  defaultSize: ISize;
  selectedSize: ISize;
  selectedQuantity = 1;

  constructor(private lOrderService: OrderService) {
    'ngInject';

    this.product = cloneDeep(this.product);
    this.initSelectedSize();
  }

  calcWeight(): number {
    return this.lOrderService.calcWeightFor(this.product, this.selectedSize, this.selectedQuantity);
  }

  onToggle() {
    this.triggerToggle({
      product: this.product,
      checked: this.checked,
      size: this.selectedSize,
      quantity: this.selectedQuantity
    });
  }

  onSizeSelected(size: ISize) {
    this.selectedSize = size;

    this.triggerSizeChange({
      product: this.product,
      size: size
    });
  }

  onQuantityChanged(quantity: number) {
    this.selectedQuantity = quantity;

    this.triggerQuantityChange({
      product: this.product,
      quantity: quantity
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
    triggerQuantityChange: '&onQuantityChanged'
  }
};
