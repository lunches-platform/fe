import {cloneDeep, find, reduce, every, map, uniqueId} from 'lodash';
import {IHttpService, IQService} from 'angular';

import {uniqId} from '../../config';

import {
  ILineItem,
  ILineItemRequestBody,
  ILineItemResponseBody,
  LineItemService
} from '../components/line-item/line-item.service';
import {IProduct} from './product';

export interface IOrder {
  id: number;
  items: ILineItem[];
  customer: string;
  address: string;
  shipmentDate: string;
}

export interface IPlaceOrderRequestBody {
  items: ILineItemRequestBody[];
  customer: string;
  address: string;
  shipmentDate: string;
}

export interface IOrderResponseBody {
  id: number;
  price: number;
  // todo: rename to `orderNumber`
  number: number;
  customer: string;
  createdAt: string;
  shipmentDate: string;
  address: string;
  // todo: rename to `items`
  lineItems: ILineItemResponseBody[];
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

  createOrderByDate(date: string): IOrder {
    return {
      id: uniqId(),
      items: [],
      customer: null,
      address: null,
      shipmentDate: date
    };
  }

  createOrderByDateAndId(date: string, id: number): IOrder {
    return {
      id: id,
      items: [],
      customer: null,
      address: null,
      shipmentDate: date
    };
  }

  addLineItems(items: ILineItem[], _order: IOrder): IOrder {
    let order = cloneDeep(_order);

    items.forEach(item => {
      order.items.push(item);
    });

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
    const userName = 'Yuriy';
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/customers/' + userName + '/orders';
    return this.$http.get<IOrderResponseBody[]>(url).then(res => this.transformToOrdersList(res.data));
  }

  private transformToOrdersList(orders: IOrderResponseBody[]): IOrder[] {
    return map<IOrderResponseBody, IOrder>(orders, order => {

      const size: ISize = {
        id: 'medium',
        title: 'Medium'
      };

      const items = map<ILineItemResponseBody, ILineItem>(order.lineItems, item => {
        // todo: replace with real data from API
        const product: IProduct = {
          id: item.productId,
          name: 'Гречка',
          price: 0,
          ingredients: [],
          sizeToWeight: {
            medium: 100,
            big: 200
          }
        };

        return {
          id: item.id,
          product: product,
          size: size, // todo: replace with real data
          quantity: item.quantity
        };
      });

      return {
        id: order.id,
        items: items,
        customer: order.customer,
        address: order.address,
        shipmentDate: 'hello' // todo: replace with real data
      };
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

