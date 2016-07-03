import {Product} from '../components/product/product.service';
import {ISize} from '../components/size-selector/size-selector.component';
import {cloneDeep, find} from 'lodash';
import {Menu} from '../components/menu/menu.service';

export class LineItem {
  constructor(
    public product: Product,
    public size: ISize,
    public quantity: number,
    public menu: Menu
  ) {
  }
}

export class Order {
  id: string;
  date: string;
  items: LineItem[] = [];
  customer: string;

  constructor() {
    // todo: get current date
    this.date = '2015-04-12 14:42:73';
  }
}

export class OrderService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  addProductTo(existingOrder: Order, menu: Menu, productToBeAdded: Product, size: ISize, quantity: number): Order {
    let order = cloneDeep(existingOrder);

    order.items.push(new LineItem(productToBeAdded, size, quantity, menu));

    return order;
  }

  removeProductFrom(existingOrder: Order, menu: Menu, productToBeRemoved: Product): Order {
    let order = cloneDeep(existingOrder);

    let lineItem = this.findLineItemFor(productToBeRemoved, order, menu);

    if (lineItem) {
      order.items = order.items.filter(existingLineItem => {
        return existingLineItem.product.id !== productToBeRemoved.id;
      });
    }

    return order;
  }

  findLineItemFor(product: Product, order: Order, menu: Menu): LineItem {
    let menuItems = this.findLineItemsForIn(menu, order);

    return find(menuItems, item => {
      return item.product.id === product.id;
    });

  }

  findLineItemsForIn(menu: Menu, order: Order): LineItem[] {
    return order.items.filter(item => {
      return item.menu.id === menu.id;
    });
  }

  calcPriceForIn(menu: Menu, order: Order): number {
    let menuItems = this.findLineItemsForIn(menu, order);

    return menuItems.reduce((sum, item) => {
      return sum + this.calcPriceFor(item);
    }, 0);
  }

  calcPriceFor(item: LineItem): number {
    return item.product.pricePer100 / 100 * this.calcWeightFor(item.product, item.size, item.quantity);
  }

  calcWeightFor(product: Product, size: ISize, quantity: number): number {
    return product.sizeToWeight[size.id] * quantity;
  }

  updateSizeForProductIn(order: Order, product: Product, size: ISize): Order {
    return this.updateLineItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: Order, product: Product, quantity: number): Order {
    return this.updateLineItemProperty(order, product, 'quantity', quantity);
  }

  private updateLineItemProperty(_order: Order, product: Product, key: string, value: ISize | number) {
    let order = cloneDeep(_order);

    let lineItem = find(order.items, ['product.id', product.id]);

    if (lineItem) {
      lineItem[key] = cloneDeep(value);
    }

    return order;
  }
}

