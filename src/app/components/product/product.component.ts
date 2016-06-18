import {Product as ProductItem} from './product.service';

class ProductControler {
  product: ProductItem;

  constructor() {
    'ngInject';
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
  //   onDestroy: '&',
  //   onChange: '&',
  //   onSave: '&'
  }
};
