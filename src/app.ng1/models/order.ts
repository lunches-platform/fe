// third-party deps
import { cloneDeep, find, sumBy, every, map, filter } from 'lodash';
import { IHttpService, IQService, IPromise } from 'angular';
import * as moment from 'moment';

// internal deps
import { IUser, UserService } from './user';
import { uniqId } from '../config';
import { ILineItem, ILineItemRequestBody, LineItemService } from './line-item';
import { IProduct } from './product';
import { IMenu } from './menu';
import { PriceService } from './price';
import { IState as IAppConfig, ConfigService } from '../../app/config';

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

export interface IPaymentCard {
  number: string;
  holder: string;
}

export type PaymentType = 'cash' | 'card';

export interface IPlaceOrderRequestBody {
  items: ILineItemRequestBody[];
  shipmentDate: string;
  userId: string;
  address: string;
}

// todo: add types: https://github.com/lunches-platform/fe/issues/17
export class OrderService {
  private lConfig: IAppConfig;

  constructor(
    private $http: IHttpService,
    private $q: IQService,
    private lLineItemService: LineItemService,
    private lUserService: UserService,
    private lPriceService: PriceService,
    private configService: ConfigService
  ) {
    'ngInject';

    this.configService.get().first().subscribe(config => this.lConfig = config);
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

  createOrdersFrom(menus: IMenu[]): IOrder[] {
    return map(menus, menu => {
      let order = this.createOrderByDate(menu.date);
      let items = this.lLineItemService.createLineItemsBy(menu.products);
      return this.setLineItems(items, order);
    });
  }

  setLineItems(items: ILineItem[], inputOrder: IOrder): IOrder {
    let order = cloneDeep(inputOrder);
    order.items = items;
    order.price = this.lPriceService.calcPriceForAll(items, order.shipmentDate);
    return order;
  }

  setUser(user: IUser, _order: IOrder): IOrder {
    let order = cloneDeep(_order);
    order.user = user;
    return order;
  }

  updateSizeForProductIn(order: IOrder, product: IProduct, size: string): IOrder {
    return this.updateLineItemProperty(order, product, 'size', size);
  }

  updateQuantityForProductIn(order: IOrder, product: IProduct, quantity: number): IOrder {
    return this.updateLineItemProperty(order, product, 'quantity', quantity);
  }

  // todo: add return type
  placeOrders(orders: IOrder[]): IPromise<IOrder[]> {
    const url = this.lConfig.apiUrl + '/orders';
    const allOrdersPlacedPromise = map(orders, order => {
      return this.$http.post(url, this.prepareOrderForApi(order));
    });

    return this.$q.all(allOrdersPlacedPromise);
  }

  isValid(order: IOrder): boolean {
    return Boolean(
      order.user.fullname &&
      order.user.address &&
      order.shipmentDate
    );
  }

  isValidAll(orders: IOrder[]): boolean {
    return every(orders, order => this.isValid(order));
  }

  calcPriceForAll(orders: IOrder[]): number {
    return sumBy(orders, 'price');
  }

  setUserForAll(orders: IOrder[], user: IUser): IOrder[] {
    return map(orders, order => this.setUser(user, order));
  }

  fetchMyOrders(startDate: string, endDate: string): IPromise<IOrder[]> {
    const me = this.lUserService.me();

    const url = this.lConfig.apiUrl + '/users/' + me.fullname + '/orders?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<IOrder[]>(url).then(res => res.data);
  }

  fetchUnpaidOrdersFor(user: IUser): IPromise<IOrder[]> {
    const url = this.lConfig.apiUrl + '/users/' + user.fullname + '/orders?paid=0';
    return this.$http.get<IOrder[]>(url).then(res => res.data);
  }

  fetchPaymentCard(): IPromise<IPaymentCard> {
    const url = this.lConfig.apiUrl + '/paymentCard';
    return this.$http.get<IPaymentCard>(url).then(res => res.data);
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

  cancelInDb(order: IOrder): IPromise<IOrder> {
    const url = this.lConfig.apiUrl + '/orders/' + order.id + '/cancel';
    return this.$http.post<IOrder>(url, {reason: 'user request'}).then(res => res.data);
  }

  updateItemIn(inputOrder: IOrder, item: ILineItem): IOrder {
    let order = cloneDeep(inputOrder);

    order.items = order.items.map(it => {
      return it.id === item.id ? item : it;
    });

    order.price = this.lPriceService.calcPriceForAll(order.items, order.shipmentDate);

    return order;
  }

  removeItemFrom(inputOrder: IOrder, item: ILineItem): IOrder {
    let order = cloneDeep(inputOrder);

    order.items = filter(order.items, it => it.id !== item.id);
    order.price = this.lPriceService.calcPriceForAll(order.items, order.shipmentDate);

    return order;
  }

  addItemTo(inputOrder: IOrder, item: ILineItem): IOrder {
    if (find(inputOrder.items, ['id', item.id])) {
      return inputOrder;
    }

    const order = cloneDeep(inputOrder);
    order.items.push(item);
    order.price = this.lPriceService.calcPriceForAll(order.items, order.shipmentDate);

    return order;
  }

  // todo: get correct cover
  getCoverOf(order: IOrder): string {
    const firstImage = order.items[0].product.images[0];
    return firstImage ? firstImage.url : '';
  }

  sortByDate(inputOrders: IOrder[]): IOrder[] {
    let orders = cloneDeep(inputOrders);

    orders.sort((left, right) => {
      return moment.utc(left.shipmentDate).diff(moment.utc(right.shipmentDate), 'days');
    });

    return orders;
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
      address: order.user.address
    };
  }

  private prepareLineItemsForApi(items: ILineItem[]): ILineItemRequestBody[] {
    return items.map(item => {
      return {
        dishId: item.product.id,
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

    order.price = this.lPriceService.calcPriceForAll(order.items, order.shipmentDate);

    return order;
  }
}

