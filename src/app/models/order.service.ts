import {Product} from '../components/product/product.service';
import {ISize} from '../components/size-selector/size-selector.component';
import {cloneDeep, find} from 'lodash';

export class LineItem {
  constructor(
    public product: Product,
    public size: ISize,
    public quantity: number,
    public date: string
  ) {
  }
}

export class Order {
  id: string;
  date: string;
  items: LineItem[] = [];
  customer: string;
  address: string;

  constructor() {
    // todo: get current date
    this.date = '2015-04-12 14:42:73';
  }
}

export class OrderService {
  constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
    'ngInject';
  }

  addProductTo(existingOrder: Order, date: string, productToBeAdded: Product, size: ISize, quantity: number): Order {
    let order = cloneDeep(existingOrder);

    order.items.push(new LineItem(productToBeAdded, size, quantity, date));

    return order;
  }

  removeProductFrom(existingOrder: Order, date: string, productToBeRemoved: Product): Order {
    let order = cloneDeep(existingOrder);

    let lineItem = this.findLineItemFor(productToBeRemoved, order, date);

    if (lineItem) {
      order.items = order.items.filter(existingLineItem => {
        return existingLineItem.product.id !== productToBeRemoved.id;
      });
    }

    return order;
  }

  setCustomer(customer: string, _order: Order) {
    let order = cloneDeep(_order);
    order.customer = customer;
    return order;
  }

  setAddress(address: string, _order: Order) {
    let order = cloneDeep(_order);
    order.address = address;
    return order;
  }

  findLineItemFor(product: Product, order: Order, date: string): LineItem {
    let items = this.findLineItemsFor(date, order);

    return find(items, item => {
      return item.product.id === product.id;
    });

  }

  findLineItemsFor(date: string, order: Order): LineItem[] {
    return order.items.filter(item => {
      return item.date === date;
    });
  }

  calcPriceForDate(date: string, order: Order): number {
    return this.calcPriceForLineItems(this.findLineItemsFor(date, order));
  }

  calcPriceForLineItems(items: LineItem[]): number {
    return items.reduce((sum, item) => {
      return sum + this.calcPriceForLineItem(item);
    }, 0);
  }

  calcPriceForLineItem(item: LineItem): number {
    return item.product.pricePer100 / 100 * this.calcWeightFor(item.product, item.size, item.quantity);
  }

  calcPriceForOrder(order: Order): number {
    return this.calcPriceForLineItems(order.items);
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

  makeOrder(order: Order) {
    const url = 'http://dinners/api/order';
    console.log('POST ' + url);
    console.log(JSON.stringify(this.prepareOrderForApi(order)));
  }

  private prepareOrderForApi(order: Order) {
    let items = order.items.map(item => {
      return {
        product_id: item.product.id,
        size: item.size.id,
        quantity: item.quantity,
        date: item.date
      };
    });

    return {
      customer: order.customer,
      address: order.address,
      items: items
    };
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

