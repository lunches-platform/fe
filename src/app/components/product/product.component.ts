import {Product as ProductItem, ProductService} from './product.service';
import {cloneDeep} from 'lodash';

// todo: add types
class ProductControler {
  product: ProductItem;
  onToggled: any;
  onSizeChanged: any;
  checked: boolean;

  defaultSize: any;
  selectedSize: any;

  constructor(private lProductService: ProductService) {
    'ngInject';

    this.product = cloneDeep(this.product);
    this.initSelectedSize();
  }

  onToggle() {
    const p = cloneDeep(this.product);

    this.onToggled({ product: p, checked: this.checked });
  }

  onSizeSelected(size: any) {
    this.product = cloneDeep(this.lProductService.setSizeFor(this.product, size));

    this.onSizeChanged({
      product: this.product,
      size: cloneDeep(size)
    });
  }

  private initSelectedSize() {
    this.defaultSize = {
      id: 'small',
      title: 'Small'
    };

    this.selectedSize = this.product.size || this.defaultSize;
  }
  // editing: boolean = false;
  // onSave: Function;
  // onDestroy: Function;
  // todo: any;

  // handleDoubleClick() {
  //   this.editing = true;
  // }

  // handleSave(text: string) {
  //   this.onSave({
  //     todo: {
  //       text,
  //       id: this.todo.id
  //     }
  //   });
  //   this.editing = false;
  // }

  // handleDestroy(id: number) {
  //   this.onDestroy({id});
  // }
}

export const ProductComponent = {
  templateUrl: 'app/components/product/product.html',
  controller: ProductControler,
  controllerAs: 'vm',
  bindings: {
    product: '<',
    onToggled: '&',
    onSizeChanged: '&'
  //   onDestroy: '&',
  //   onChange: '&',
  //   onSave: '&'
  }
};
