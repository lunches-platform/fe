import {cloneDeep, find, reduce, every, map, uniqueId} from 'lodash';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IHttpService, IQService} from 'angular';

// todo: move Product out from line-item service
import {Product, LineItem, LineItemService} from '../components/line-item/line-item.service';
import {ISize} from '../components/size-selector/size-selector.component';

export class Order {
  items: LineItem[] = [];
  customer: string;
  address: string;

  constructor(public shipmentDate: Moment, public id: string = null) {
    this.id = id || uniqueId();
  }
}

// todo: add types: https://github.com/lunches-platform/fe/issues/17
export class OrderService {

  constructor(
    private $http: IHttpService,
    private $q: IQService,
    private lLineItemService: LineItemService
  ) {
    'ngInject';
  }

  addLineItems(items: LineItem[], _order: Order): Order {
    let order = cloneDeep(_order);

    items.forEach(item => {
      order.items.push(item);
    });

    return order;
  }

  setCustomer(customer: string, _order: Order): Order {
    let order = cloneDeep(_order);
    order.customer = customer;
    return order;
  }

  setAddress(address: string, _order: Order): Order {
    let order = cloneDeep(_order);
    order.address = address;
    return order;
  }

  calcPriceFor(order: Order): number {
    return this.lLineItemService.calcPriceForAll(order.items);
  }

  updateSizeForProductIn(order: Order, product: Product, size: ISize): Order {
    return this.updateLineItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: Order, product: Product, quantity: number): Order {
    return this.updateLineItemProperty(order, product, 'quantity', quantity);
  }

  // todo: add return type
  placeOrders(orders: Order[]) {
    const url = 'http://api.cogniance.lunches.com.ua/orders';
    const allOrdersPlacedPromise = map(orders, order => {
      return this.$http.post(url, this.prepareOrderForApi(order));
    });

    return this.$q.all(allOrdersPlacedPromise);
  }

  isValid(order: Order): boolean {
    return Boolean(
      this.calcPriceFor(order) &&
      order.address &&
      order.customer &&
      order.shipmentDate &&
      order.customer
    );
  }

  isValidAll(orders: Order[]) {
    return every(orders, order => this.isValid(order));
  }

  calcPriceForAll(orders: Order[]): number {
    return reduce(orders, (sum, order) => {
      return sum + this.calcPriceFor(order);
    }, 0);
  }

  setCustomerForAll(orders: Order[], customer: string) {
    return map(orders, order => this.setCustomer(customer, order));
  }

  setAddressForAll(orders: Order[], address: string) {
    return map(orders, order => this.setAddress(address, order));
  }

  createOrderFrom(orderJson) {
    const order = new Order(moment.utc(orderJson.shipmentDate), orderJson.id);
    order.customer = orderJson.customer;
    order.address = orderJson.address;
    order.items = map(orderJson.items, item => this.lLineItemService.createItemFrom(item));
    return order;
  }

  private prepareOrderForApi(order: Order) {
    let items = order.items.map(item => {
      return {
        productId: item.product.id,
        size: item.size.id,
        quantity: item.quantity
      };
    });

    return {
      customer: order.customer,
      address: order.address,
      shipmentDate: order.shipmentDate.format(),
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

