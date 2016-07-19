// todo: move Product out from line-item service
import {Product, LineItem, LineItemService} from '../components/line-item/line-item.service';
import {ISize} from '../components/size-selector/size-selector.component';

import {cloneDeep, find} from 'lodash';
import {IHttpService} from 'angular';
import {Moment} from 'moment';

export class Order {
  items: LineItem[] = [];
  customer: string;
  address: string;
}

// todo: add types: https://github.com/lunches-platform/fe/issues/17
export class OrderService {

  constructor(private $http: IHttpService, private lLineItemService: LineItemService) {
    'ngInject';
  }

  addLineItems(items: LineItem[], _order: Order): Order {
    let order = cloneDeep(_order);

    items.forEach(item => {
      order.items.push(item);
    });

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

  findLineItemFor(product: Product, order: Order, date: Moment): LineItem {
    let items = this.findLineItemsFor(date, order);

    return find(items, item => {
      return item.product.id === product.id;
    });

  }

  findLineItemsFor(date: Moment, order: Order): LineItem[] {
    return order.items.filter(item => {
      return item.date.isSame(date, 'day');
    });
  }

  calcPriceForOrder(order: Order): number {
    return this.lLineItemService.calcPriceForAll(order.items);
  }

  updateSizeForProductIn(order: Order, product: Product, size: ISize): Order {
    return this.updateLineItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: Order, product: Product, quantity: number): Order {
    return this.updateLineItemProperty(order, product, 'quantity', quantity);
  }

  makeOrder(order: Order) {
    const url = 'http://api.cogniance.lunches.com.ua/orders';
    const body = this.prepareOrderForApi(order);
    return this.$http.post(url, body);
  }

  private prepareOrderForApi(order: Order) {
    let items = order.items.map(item => {
      return {
        product_id: item.product.id,
        size: item.size.id,
        quantity: item.quantity,
        date: item.date.format()
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

