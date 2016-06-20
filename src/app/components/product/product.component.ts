import {Product as ProductItem} from './product.service';
import {cloneDeep} from 'lodash';

class ProductControler {
  product: ProductItem;
  onToggled: Function;
  checked: boolean;

  constructor() {
    'ngInject';

    this.product = cloneDeep(this.product);
  }

  onToggle() {
    this.onToggled({ product: cloneDeep(this.product), checked: this.checked });
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
    onToggled: '&'
  //   onDestroy: '&',
  //   onChange: '&',
  //   onSave: '&'
  }
};
