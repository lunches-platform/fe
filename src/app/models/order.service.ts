import {Product} from '../components/product/product.service';
import {ISize} from '../components/size-selector/size-selector.component';
import {cloneDeep, find} from 'lodash';

export class OrderItem {
  id: string;

  constructor(
    public product: Product,
    public size: ISize,
    public quantity: number
  ) {
  }
}

export class Order {
  id: string;
  date: string;
  items: OrderItem[] = [];

  constructor() {
    // todo: get current date
    this.date = '2015-04-12 14:42:73';
  }
}

export class OrderService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  addProductTo(existingOrder: Order, productToBeAdded: Product, size: ISize, quantity: number): Order {
    let order = cloneDeep(existingOrder);

    order.items.push(new OrderItem(productToBeAdded, size, quantity));

    return order;
  }

  removeProductFrom(existingOrder: Order, productToBeRemoved: Product): Order {
    let order = cloneDeep(existingOrder);

    let orderItem = this.findOrderItemFor(productToBeRemoved, order);

    if (orderItem) {
      order.items = order.items.filter(existingOrderItem => {
        return existingOrderItem.product.id !== productToBeRemoved.id;
      });
    }

    return order;
  }

  findOrderItemFor(product: Product, order: Order): OrderItem {
    return find(order.items, ['product.id', product.id]);
  }

  calcPriceForAllProductsIn(order: Order): number {
    return order.items.reduce((sum, item) => {
      return sum + this.calcPriceFor(item);
    }, 0);
  }

  calcPriceFor(item: OrderItem): number {
    return item.product.pricePer100 / 100 * this.calcWeightFor(item.product, item.size, item.quantity);
  }

  calcWeightFor(product: Product, size: ISize, quantity: number): number {
    return product.sizeToWeight[size.id] * quantity;
  }

  updateSizeForProductIn(order: Order, product: Product, size: ISize): Order {
    return this.updateOrderItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: Order, product: Product, quantity: number): Order {
    return this.updateOrderItemProperty(order, product, 'quantity', quantity);
  }

  private updateOrderItemProperty(_order: Order, product: Product, key: string, value: ISize | number) {
    let order = cloneDeep(_order);

    let orderItem = find(order.items, ['product.id', product.id]);

    if (orderItem) {
      orderItem[key] = cloneDeep(value);
    }

    return order;
  }
}

