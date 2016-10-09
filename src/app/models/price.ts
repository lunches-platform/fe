import {reduce, sortBy, each, mapValues, isNil, isEmpty, map, union} from 'lodash';
import {IPromise, IHttpService, ILogService, ITimeoutService} from 'angular';
import * as moment from 'moment';

import {SHORT_DATE_FORMAT} from '../../config';

import {ILineItem} from './line-item';
import {IMenu} from './menu';
import {IProduct} from './product';

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
export type PriceList = Map<string, number>;

/* tslint:disable */
// export const priceList: PriceList = {
//   // big -----------------------------------------------------------------------
//   // full
//   'meat-big|garnish-big|salad-big': 70,
//   'fish-big|garnish-big|salad-big': 90,

//   // no meat/fish
//   'garnish-big|salad-big': 45,

//   // no salad (meat included)
//   'meat-big|garnish-big': 55,

//   // no salad (fish included)
//   'fish-big|garnish-big': 75,

//   // no garnish (meat included)
//   'meat-big|salad-big': 55,

//   // no garnish (fish included)
//   'fish-big|salad-big': 75,

//   'salad-big': 25,
//   'meat-big': 35,
//   'fish-big': 55,
//   'garnish-big': 30,

//   // medium --------------------------------------------------------------------
//   // full
//   'meat-medium|garnish-medium|salad-medium': 45,
//   'fish-medium|garnish-medium|salad-medium': 55,

//   // no meat/fish
//   'garnish-medium|salad-medium': 35,

//   // no salad (meat included)
//   'meat-medium|garnish-medium': 40,

//   // no salad (fish included)
//   'fish-medium|garnish-medium': 50,

//   // no garnish (meat included)
//   'meat-medium|salad-medium': 40,

//   // no garnish (fish included)
//   'fish-medium|salad-medium': 50,

//   'salad-medium': 20,
//   'meat-medium': 30,
//   'fish-medium': 45,
//   'garnish-medium': 20
// };
/* tslint:enable */

// todo: a lot of performance issues
export class PriceService {
  constructor(
    private $http: IHttpService,
    private $log: ILogService,
    private $timeout: ITimeoutService,
    private localStorageService: ILocalStorageService,
    // todo: add type
    private lConfig
  ) {
    'ngInject';
  }

  // fetchPriceGroupsForActualDays(): IPromise<PriceGroupsByDate> {
  //   const startDate = moment().format(SHORT_DATE_FORMAT);
  //   const endDate = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

  //   const url = this.lConfig.apiUrl + '/prices?startDate=' + startDate + '&endDate=' + endDate;
  //   return this.$http.get<IPriceGroup[]>(url, {cache: true}).then(res => {
  //     // const pricesByDate = this.priceGroupsByDateToPricesByDate(res.data);
  //     // this.storeToLocalStorage(pricesByDate);
  //     // return pricesByDate;
  //     return [];
  //   });
  // }

  // priceGroupsByDateToPricesByDate(priceGroupsByDate: PriceGroupsByDate): PricesByDate {
  //   return mapValues(priceGroupsByDate, priceGroups => {
  //     return this.convertPriceGroupsToKeyPrice(priceGroups);
  //   });
  // }

  calcPriceForAll(orderLineItems: ILineItem[], date: string): number {
    if (orderLineItems.length === 0) {
      return 0;
    }

    let prices = this.getPricesFromLocalStorage(date);

    if (isEmpty(prices)) {
      return 0;
    }

    const orderGroupKey = this.groupKeyForLineItems(orderLineItems);
    let price = prices[orderGroupKey];
    if (isNil(price)) {
      price = this.calcFallbackPriceFor(orderLineItems, prices);
      this.$log.warn('Price: Price not found! Calculate sum of product prices.', price, orderLineItems, prices);
    }
    return price;
  }

  // todo: find out more clean solution
  // createPriceGroupsForAllMenus(menus: IMenu[]): IPriceGroup[] {
  //   let priceGroups = [];

  //   each(menus, menu => {
  //     priceGroups = union(priceGroups, this.createPriceGroupsForDayMenu(menu));
  //   });

  //   return priceGroups;
  // }

  // // todo: generalize for any amount of menu products and sizes
  // createPriceGroupsForDayMenu(menu: IMenu): IPriceGroup[] {
  //   let meat,
  //     garnish,
  //     salad,
  //     meatGarnishPriceGroupBig,
  //     meatGarnishPriceGroupMedium,
  //     garnishSaladPriceGroupBig,
  //     garnishSaladPriceGroupMedium;

  //   if (menu.products.length === 3) {
  //     meat = menu.products[0];
  //     garnish = menu.products[1];
  //     salad = menu.products[2];
  //   } else {
  //     meat = menu.products[0];
  //     salad = menu.products[1];
  //   }

  //   const perProductPriceGroupsBig = this.createPerProductPriceGroups(menu, 'big');
  //   const perProductPriceGroupsMedium = this.createPerProductPriceGroups(menu, 'medium');

  //   const allProductsPriceGroupBig = this.createPriceGroupForProductsCombination(menu.products, menu.date, 'big');
  //   const allProductsPriceGroupMedium = this.createPriceGroupForProductsCombination(menu.products, menu.date, 'medium');

  //   const meatSaladPriceGroupBig = this.createPriceGroupForProductsCombination([meat, salad], menu.date, 'big');
  //   const meatSaladPriceGroupMedium = this.createPriceGroupForProductsCombination([meat, salad], menu.date, 'medium');

  //   if (garnish) {
  //     meatGarnishPriceGroupBig = this.createPriceGroupForProductsCombination([meat, garnish], menu.date, 'big');
  //     meatGarnishPriceGroupMedium = this.createPriceGroupForProductsCombination([meat, garnish], menu.date, 'medium');
  //     garnishSaladPriceGroupBig = this.createPriceGroupForProductsCombination([garnish, salad], menu.date, 'big');
  //     garnishSaladPriceGroupMedium = this.createPriceGroupForProductsCombination([garnish, salad], menu.date, 'medium');
  //   }

  //   let groups = union(
  //     perProductPriceGroupsBig,
  //     perProductPriceGroupsMedium,
  //     [
  //       allProductsPriceGroupBig,
  //       allProductsPriceGroupMedium,
  //       meatSaladPriceGroupBig,
  //       meatSaladPriceGroupMedium,
  //     ]
  //   );

  //   if (garnish) {
  //     groups = union(
  //       groups,
  //       [
  //         meatGarnishPriceGroupBig,
  //         meatGarnishPriceGroupMedium,
  //         garnishSaladPriceGroupBig,
  //         garnishSaladPriceGroupMedium
  //       ]
  //     );
  //   }

  //   return groups;
  // }

  // createPriceGroupForProductsCombination(products: IProduct[], date: string, size: string): IPriceGroup {
  //   const price = this.calcPriceForProductCombination(products, size);
  //   const items = this.createPriceGroupItemsForAll(products, size);
  //   return {date, price, items};
  // }

  // pushPriceGroups(groups: IPriceGroup[]): void {
  //   each(groups, group => {
  //     const url = this.lConfig.apiUrl + '/prices/' + group.date;

  //     this.$timeout(() => {
  //       this.$http.put(url, group);
  //     }, 1000);
  //   });
  // }

  // private calcPriceForProductCombination(products: IProduct[], size: string): number {
  //   const key = map(products, product => product.type + '-' + size).join('|');
  //   return priceList[key];
  // }

  // private createPerProductPriceGroups(menu: IMenu, size: string): IPriceGroup[] {
  //   return map(menu.products, product => {
  //     return this.createPriceGroupForProductsCombination([product], menu.date, size);
  //   });
  // }

  // private createPriceGroupItemsForAll(products: IProduct[], size: string): IPriceGroupItem[] {
  //   return map(products, product => {
  //     return {
  //       size,
  //       productId: product.id
  //     };
  //   });
  // }

  private groupKeyForLineItems(lineItems: ILineItem[]): string {
    const sortedLineItems = sortBy(lineItems, 'product.id');

    return reduce(sortedLineItems, (key, lineItem) => {
      return key + this.groupKeyForLineItem(lineItem);
    }, '');
  }

  private groupKeyForLineItem(lineItem: ILineItem): string {
    return lineItem.product.id + '-' + lineItem.size + '|';
  }

  // private groupKeyForPriceGroup(priceGroup: IPriceGroup): string {
  //   const sortedPriceGroupItems = sortBy(priceGroup.items, 'productId');

  //   return reduce(sortedPriceGroupItems, (key, priceItem) => {
  //     return key + priceItem.productId + '-' + priceItem.size + '|';
  //   }, '');
  // }

  // private convertPriceGroupsToKeyPrice(priceGroups: IPriceGroup[]): Map<string, number> {
  //   const keyPriceHash = new Map();

  //   each(priceGroups, priceGroup => {
  //     const groupKey = this.groupKeyForPriceGroup(priceGroup);
  //     keyPriceHash[groupKey] = priceGroup.price;
  //   });

  //   return keyPriceHash;
  // }

  private calcFallbackPriceFor(lineItems: ILineItem[], prices: PricesPerDay): number {
    return reduce(lineItems, (sum, lineItem) => {
      return prices[this.groupKeyForLineItem(lineItem)];
    }, 0);
  }

  // private storeToLocalStorage(prices: PricesByDate): boolean {
  //   if (!prices) {
  //     return false;
  //   }

  //   return this.localStorageService.set('pricesByDate', prices);
  // }

  private getPricesFromLocalStorage(date: string): PricesPerDay {
    const prices = this.localStorageService.get('pricesByDate');
    if (!prices) {
      return new Map();
    }

    return prices[date] || {};
  }
}
