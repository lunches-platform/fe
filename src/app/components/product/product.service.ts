import {cloneDeep} from 'lodash';

// todo: get from BE
const sizeWeightMap = {
  small: 150,
  mid: 220,
  big: 400
};

// todo: get from BE
const sizePriceMap = {
  small: 35,
  mid: 45,
  big: 70
};

// todo: add types
export class Product {
  id: number;
  name: string;
  price: number;
  size: any;
  weight: number;
  ingredients: string[];
}

export class ProductService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  setSizeFor(product: Product, size: any): Product {
    const p = cloneDeep(product);
    p.size = size;

    // recalculate weight and price also
    p.weight = sizeWeightMap[size.id];
    p.price = sizePriceMap[size.id];

    return p;
  }

  // addProduct(text: string, products: Product[]) {
  //   return [
  //     {
  //       id: (products.length === 0) ? 0 : products[0].id + 1,
  //       completed: false,
  //       text
  //     }
  //   ].concat(products);
  // }

  // completeProduct(id: number, products: Product[]) {
  //   return products.map(todo => {
  //     return todo.id === id ?
  //       assign({}, todo, {completed: !todo.completed}) :
  //       todo;
  //   });
  // }

  // deleteProduct(id: number, products: Product[]) {
  //   return products.filter(todo => todo.id !== id);
  // }

  // editProduct(id: number, text: string, products: Product[]) {
  //   return products.map(todo => {
  //     return todo.id === id ?
  //       assign({}, todo, {text}) :
  //       todo;
  //   });
  // }

  // completeAll(products: Product[]) {
  //   const areAllMarked = products.every(todo => todo.completed);
  //   return products.map(todo => assign({}, todo, {completed: !areAllMarked}));
  // }

  // clearCompleted(products: Product[]) {
  //   return products.filter(todo => {
  //     return todo.completed === false;
  //   });
  // }
}

