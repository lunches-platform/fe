import {cloneDeep, find, reduce, every, map, uniqueId} from 'lodash';
import {IHttpService, IQService} from 'angular';

import {uniqId} from '../../config';
import {IUser, UserService} from './user';

import {ILineItem, ILineItemRequestBody, LineItemService} from '../components/line-item/line-item.service';
import {IProduct} from './product';

export interface IOrder {
  id: number;
  items: ILineItem[];
  shipmentDate: string;
  address: string;
  customer: string;
  canceled: boolean;
  createdAt?: string;
  orderNumber?: string;
  price?: number;
}

export interface IPlaceOrderRequestBody {
  items: ILineItemRequestBody[];
  customer: string;
  address: string;
  shipmentDate: string;
}

// todo: add types: https://github.com/lunches-platform/fe/issues/17
export class OrderService {

  constructor(
    private $http: IHttpService,
    private $q: IQService,
    private lLineItemService: LineItemService,
    private lUserService: UserService
  ) {
    'ngInject';
  }

  createOrderByDate(date: string): IOrder {
    return {
      id: uniqId(),
      items: [],
      customer: null,
      address: null,
      shipmentDate: date,
      price: 0,
      canceled: false
    };
  }

  createOrderByDateAndId(date: string, id: number): IOrder {
    return {
      id: id,
      items: [],
      customer: null,
      address: null,
      shipmentDate: date,
      price: 0,
      canceled: false
    };
  }

  addLineItems(items: ILineItem[], _order: IOrder): IOrder {
    let order = cloneDeep(_order);

    items.forEach(item => {
      order.items.push(item);
    });

    order.price = this.calcPriceFor(order);

    return order;
  }

  setCustomer(customer: string, _order: IOrder): IOrder {
    let order = cloneDeep(_order);
    order.customer = customer;
    return order;
  }

  setAddress(address: string, _order: IOrder): IOrder {
    let order = cloneDeep(_order);
    order.address = address;
    return order;
  }

  calcPriceFor(order: IOrder): number {
    return this.lLineItemService.calcPriceForAll(order.items);
  }

  updateSizeForProductIn(order: IOrder, product: IProduct, size: string): IOrder {
    return this.updateLineItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: IOrder, product: IProduct, quantity: number): IOrder {
    return this.updateLineItemProperty(order, product, 'quantity', quantity);
  }

  // todo: add return type
  placeOrders(orders: IOrder[]) {
    const url = 'http://api.cogniance.lunches.com.ua/orders';
    const allOrdersPlacedPromise = map(orders, order => {
      return this.$http.post(url, this.prepareOrderForApi(order));
    });

    return this.$q.all(allOrdersPlacedPromise);
  }

  isValid(order: IOrder): boolean {
    return Boolean(
      this.calcPriceFor(order) &&
      order.address &&
      order.customer &&
      order.shipmentDate &&
      order.customer
    );
  }

  isValidAll(orders: IOrder[]): boolean {
    return every(orders, order => this.isValid(order));
  }

  calcPriceForAll(orders: IOrder[]): number {
    return reduce(orders, (sum, order) => {
      return sum + this.calcPriceFor(order);
    }, 0);
  }

  setCustomerForAll(orders: IOrder[], customer: string): IOrder[] {
    return map(orders, order => this.setCustomer(customer, order));
  }

  setAddressForAll(orders: IOrder[], address: string): IOrder[] {
    return map(orders, order => this.setAddress(address, order));
  }

  fetchMyOrders(): IPromise<IOrder[]> {
    const me = this.lUserService.me();

    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + me.fullName + '/orders';
    return this.$http.get<IOrder[]>(url).then(res => res.data);
  }

  cancel(order: IOrder): IOrder {
    return this.updateIn(order, 'canceled', true);
  }

  restore(order: IOrder): IOrder {
    return this.updateIn(order, 'canceled', false);
  }

  cancelOrderIn(orders: IOrder[], orderToBeCanceled: IOrder): IOrder[] {
    return this.updateOrderIn(orders, orderToBeCanceled, 'canceled', true);
  }

  restoreOrderIn(orders: IOrder[], orderToBeRestored: IOrder): IOrder[] {
    return this.updateOrderIn(orders, orderToBeRestored, 'canceled', false);
  }

  syncOrderFor(user: IUser, order: IOrder): IPromise<IOrder> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + user.fullName + '/orders/' + order.id;
    return this.$http
      .put<IOrder>(url, order)
      .then(res => res.data);
  }

  private updateIn(inputOrder: IOrder, key: string, value: any): IOrder {
    const order = cloneDeep(inputOrder);
    order[key] = value;
    return order;
  }

  private updateOrderIn(orders: IOrder[], orderToBeUpdated: IOrder, key: string, value: any): IOrder[] {
    return map(orders, order => {
      return order.id === orderToBeUpdated.id ? this.updateIn(order, key, value) : order;
    });
  }

  private prepareOrderForApi(order: IOrder): IPlaceOrderRequestBody {
    return {
      items: this.prepareLineItemsForApi(order.items),
      customer: order.customer,
      address: order.address,
      shipmentDate: order.shipmentDate,
    };
  }

  private prepareLineItemsForApi(items: ILineItem[]): ILineItemRequestBody[] {
    return items.map(item => {
      return {
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity
      };
    });
  }

  private updateLineItemProperty(_order: IOrder, product: IProduct, key: string, value: string | number) {
    let order = cloneDeep(_order);

    let lineItem = find(order.items, ['product.id', product.id]);

    if (lineItem) {
      lineItem[key] = cloneDeep(value);
    }

    return order;
  }
}

