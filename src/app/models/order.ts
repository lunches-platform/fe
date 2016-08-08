import {cloneDeep, find, reduce, every, map, filter} from 'lodash';
import {IHttpService, IQService, IPromise} from 'angular';

import {uniqId} from '../../config';
import {IUser, UserService} from './user';

import {ILineItem, ILineItemRequestBody, LineItemService} from './line-item';
import {IProduct} from './product';

export interface IOrder {
  id: number;
  items: ILineItem[];
  shipmentDate: string;
  user: IUser;
  canceled: boolean;
  paid: boolean;
  createdAt?: string;
  orderNumber?: string;
  price?: number;
}

export interface IPlaceOrderRequestBody {
  items: ILineItemRequestBody[];
  userId: string;
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
      user: null,
      shipmentDate: date,
      price: 0,
      canceled: false,
      paid: false
    };
  }

  createOrderByDateAndId(date: string, id: number): IOrder {
    return {
      id: id,
      items: [],
      user: null,
      shipmentDate: date,
      price: 0,
      canceled: false,
      paid: false
    };
  }

  setLineItems(items: ILineItem[], inputOrder: IOrder): IOrder {
    let order = cloneDeep(inputOrder);
    order.items = items;
    return order;
  }

  addLineItems(items: ILineItem[], _order: IOrder): IOrder {
    let order = cloneDeep(_order);

    items.forEach(item => {
      order.items.push(item);
    });

    return order;
  }

  setUser(user: IUser, _order: IOrder): IOrder {
    let order = cloneDeep(_order);
    order.user = user;
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
  placeOrders(orders: IOrder[]): IPromise<IOrder[]> {
    const url = 'http://api.cogniance.lunches.com.ua/orders';
    const allOrdersPlacedPromise = map(orders, order => {
      return this.$http.post(url, this.prepareOrderForApi(order));
    });

    return this.$q.all(allOrdersPlacedPromise);
  }

  isValid(order: IOrder): boolean {
    return Boolean(
      this.calcPriceFor(order) &&
      order.user.fullname &&
      order.user.address &&
      order.shipmentDate
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

  setUserForAll(orders: IOrder[], user: IUser): IOrder[] {
    return map(orders, order => this.setUser(user, order));
  }

  fetchMyOrders(startDate: string, endDate: string): IPromise<IOrder[]> {
    const me = this.lUserService.me();

    // todo: do not hardcode BE URL: DEZ-774
    const basePath = 'http://api.cogniance.lunches.com.ua';
    const url = basePath + '/customers/' + me.fullname + '/orders?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<IOrder[]>(url).then(res => res.data);
  }

  cancel(order: IOrder): IOrder {
    return this.updateIn(order, 'canceled', true);
  }

  restore(order: IOrder): IOrder {
    return this.updateIn(order, 'canceled', false);
  }

  updateOrderIn(orders: IOrder[], orderToBeUpdated: IOrder): IOrder[] {
    return map(orders, order => {
      return order.id === orderToBeUpdated.id ? orderToBeUpdated : order;
    });
  }

  syncOrderFor(user: IUser, order: IOrder): IPromise<IOrder> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + user.fullname + '/orders/' + order.id;
    return this.$http
      .put<IOrder>(url, order)
      .then(res => res.data);
  }

  updateItemIn(inputOrder: IOrder, item: ILineItem): IOrder {
    let order = cloneDeep(inputOrder);

    order.items = order.items.map(it => {
      return it.id === item.id ? item : it;
    });

    return order;
  }

  removeItemFrom(inputOrder: IOrder, item: ILineItem): IOrder {
    let order = cloneDeep(inputOrder);

    order.items = filter(order.items, it => it.id !== item.id);

    return order;
  }

  addItemTo(inputOrder: IOrder, item: ILineItem): IOrder {
    if (find(inputOrder.items, ['id', item.id])) {
      return inputOrder;
    }

    const order = cloneDeep(inputOrder);
    order.items.push(item);

    return order;
  }

  private updateIn(inputOrder: IOrder, key: string, value: any): IOrder {
    const order = cloneDeep(inputOrder);
    order[key] = value;
    return order;
  }


  private prepareOrderForApi(order: IOrder): IPlaceOrderRequestBody {
    return {
      items: this.prepareLineItemsForApi(order.items),
      userId: order.user.id,
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

  private updateLineItemProperty(_order: IOrder, product: IProduct, key: string, value: string | number): IOrder {
    let order = cloneDeep(_order);

    let lineItem = find(order.items, ['product.id', product.id]);

    if (lineItem) {
      lineItem[key] = cloneDeep(value);
    }

    return order;
  }
}

