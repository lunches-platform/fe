import {Product as ProductItem} from '../products/products';

class ProductControler {
  product: ProductItem;

  constructor() {
    'ngInject';

    console.log(this.product);
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

export const Product = {
  templateUrl: 'app/components/Product.html',
  controller: ProductControler,
  controllerAs: 'vm',
  bindings: {
    product: '<',
  //   onDestroy: '&',
  //   onChange: '&',
  //   onSave: '&'
  }
};
