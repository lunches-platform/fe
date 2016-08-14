import {reduce, sortBy, each, mapValues, isNil} from 'lodash';
import {IPromise, IHttpService, ILogService} from 'angular';
import * as moment from 'moment';

import {SHORT_DATE_FORMAT} from '../../config';

import {ILineItem} from './line-item';
type ILocalStorageService = angular.local.storage.ILocalStorageService;

export interface IPriceGroupItem {
  productId: number;
  size: string;
}

export interface IPriceGroup {
  date: string;
  price: number;
  items: IPriceGroupItem[];
}

export type PriceGroupsByDate = Map<string, IPriceGroup[]>;
// {'2016-07-12': PricesPerDay, ...}
export type PricesByDate = Map<string, PricesPerDay>;
// {'24-medium|3-big|': 75, ...}
export type PricesPerDay = Map<string, number>;

// todo: a lot of performance issues
export class PriceService {
  constructor(
    private $http: IHttpService,
    private $log: ILogService,
    private localStorageService: ILocalStorageService,
    // todo: add type
    private lConfig
  ) {
    'ngInject';
  }

  fetchPriceGroupsForActualDays(): IPromise<PriceGroupsByDate> {
    const startDate = moment().format(SHORT_DATE_FORMAT);
    const endDate = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

    const url = this.lConfig.apiUrl + '/prices?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<IPriceGroup[]>(url, {cache: true}).then(res => {
      const pricesByDate = this.priceGroupsByDateToPricesByDate(res.data);
      this.storeToLocalStorage(pricesByDate);
      return pricesByDate;
    });
  }

  priceGroupsByDateToPricesByDate(priceGroupsByDate: PriceGroupsByDate): PricesByDate {
    return mapValues(priceGroupsByDate, priceGroups => {
      return this.convertPriceGroupsToKeyPrice(priceGroups);
    });
  }

  calcPriceForAll(orderLineItems: ILineItem[], date: string): number {
    if (orderLineItems.length === 0) {
      return 0;
    }

    let prices = this.getPricesFromLocalStorage(date);

    const orderGroupKey = this.groupKeyForLineItems(orderLineItems);
    let price = prices[orderGroupKey];
    if (isNil(price)) {
      price = this.calcFallbackPriceFor(orderLineItems, prices);
      this.$log.warn('Price: Price not found! Calculate sum of product prices.', price, orderLineItems, prices);
    }
    return price;
  }

  private groupKeyForLineItems(lineItems: ILineItem[]): string {
    const sortedLineItems = sortBy(lineItems, 'product.id');

    return reduce(sortedLineItems, (key, lineItem) => {
      return key + this.groupKeyForLineItem(lineItem);
    }, '');
  }

  private groupKeyForLineItem(lineItem: ILineItem): string {
    return lineItem.product.id + '-' + lineItem.size + '|';
  }

  private groupKeyForPriceGroup(priceGroup: IPriceGroup): string {
    const sortedPriceGroupItems = sortBy(priceGroup.items, 'productId');

    return reduce(sortedPriceGroupItems, (key, priceItem) => {
      return key + priceItem.productId + '-' + priceItem.size + '|';
    }, '');
  }

  private convertPriceGroupsToKeyPrice(priceGroups: IPriceGroup[]): Map<string, number> {
    const keyPriceHash = {};

    each(priceGroups, priceGroup => {
      const groupKey = this.groupKeyForPriceGroup(priceGroup);
      keyPriceHash[groupKey] = priceGroup.price;
    });

    return keyPriceHash;
  }

  private calcFallbackPriceFor(lineItems: ILineItem[], prices: PricesPerDay): number {
    return reduce(lineItems, (sum, lineItem) => {
      return prices[this.groupKeyForLineItem(lineItem)];
    }, 0);
  }

  private storeToLocalStorage(prices: PricesByDate): boolean {
    if (!prices) {
      return false;
    }

    return this.localStorageService.set('pricesByDate', prices);
  }

  private getPricesFromLocalStorage(date: string): PricesPerDay {
    return this.localStorageService.get('pricesByDate')[date];
  }
}
