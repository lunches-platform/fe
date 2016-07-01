import {Product as ProductItem, ProductService} from './product.service';
import {cloneDeep} from 'lodash';

// todo: add types
class ProductControler {
  product: ProductItem;
  onToggled: any;
  onSizeChanged: any;
  checked: boolean;

  defaultSize: any;

  constructor(private lProductService: ProductService) {
    'ngInject';

    this.product = cloneDeep(this.product);
    this.initDefaultSize();
  }

  onToggle() {
    const p = cloneDeep(this.product);

    this.onToggled({ product: p, checked: this.checked });
  }

  onSizeSelected(size: any) {
    const updatedProduct = cloneDeep(this.lProductService.setSizeFor(this.product, size));

    this.onSizeChanged({
      product: updatedProduct,
      size: cloneDeep(size)
    });
  }

  private initDefaultSize() {
    this.defaultSize = {
      id: 'small',
      title: 'Small'
    };
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
