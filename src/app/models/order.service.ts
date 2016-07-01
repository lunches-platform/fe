import {Product} from '../components/product/product.service';
import {cloneDeep, findIndex} from 'lodash';

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
    return Boolean();
  }

  calcPriceForAllProductsIn(orderItem: OrderItem) {
    return this.calcPriceFor(orderItem.products);
  }

  calcPriceFor(products: Product[]) {
    return products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);
  }

  updateProductIn(existingOrderItem: OrderItem, product: Product): OrderItem {
    let orderItem: OrderItem = cloneDeep(existingOrderItem);
    let products: Product[] = orderItem.products;

    let productIndex = findIndex(products, ['id', product.id]);

    if (productIndex !== -1) {
      orderItem.products = this.replaceProduct(products, product, productIndex);
    }

    return orderItem;
  }

  private replaceProduct(products: Product[], product: Product, index: number): Product[] {
    let productsCopy = cloneDeep(products);
    productsCopy.splice(index, 1, product);
    return productsCopy;
  }
}

