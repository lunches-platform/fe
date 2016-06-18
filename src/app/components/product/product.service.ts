// import {assign} from '../assign';

export class Product {
  id: number;
  name: string;
  weight: number;
  ingredients: string[];
}

export class ProductService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  fetchAll() {
    return this.$q.resolve([
      {
        id: 1,
        name: 'Куриная котлета',
        ingredients: ['Курица', 'Яйцо'],
        weight: 200
      },
      {
        id: 2,
        name: 'Гречка с грибами',
        ingredients: ['Гречка', 'грибы'],
        weight: 300
      }
    ]);
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

