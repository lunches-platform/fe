import {Product} from '../components/product/product.service';
import {cloneDeep, find} from 'lodash';

export class OrderItem {
  id: number;
  date: string;
  price: number;
  products: Product[] = [];

  constructor() {
    this.date = '2015-04-12 14:42:73';
  }
}

export class OrderService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  addProductTo(existingOrderItem: OrderItem, productToBeAdded: Product): OrderItem {
    let orderItem: OrderItem = cloneDeep(existingOrderItem);

    if (!this.contains(orderItem, productToBeAdded)) {
      orderItem.products.push(productToBeAdded);
    }

    return orderItem;
  }

  removeProductFrom(existingOrderItem: OrderItem, productToBeRemoved: Product): OrderItem {
    let orderItem: OrderItem = cloneDeep(existingOrderItem);

    if (this.contains(orderItem, productToBeRemoved)) {
      orderItem.products = orderItem.products.filter(existingProduct => {
        return existingProduct.id !== productToBeRemoved.id;
      });
    }

    return orderItem;
  }

  contains(orderItem: OrderItem, product: Product): boolean {
    return Boolean(find(orderItem.products, ['id', product.id]));
  }
}

