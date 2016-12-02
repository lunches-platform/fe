// third-party deps
import { reduce, sortBy, isNil, isEmpty, mapValues, each, Dictionary } from 'lodash';
import { IHttpService, ILogService, IPromise } from 'angular';
import * as moment from 'moment';
type ILocalStorageService = angular.local.storage.ILocalStorageService;

// internal deps
import { ILineItem } from './line-item';
import { SHORT_DATE_FORMAT } from '../config';
import { IState as IAppConfig, ConfigService } from '../../app/config';

export interface IPriceGroupItem {
  productId: number;
  size: string;
}

export interface IPriceGroup {
  date: string;
  price: number;
  items: IPriceGroupItem[];
}

// response format from API
// {
//   '2016-07-12': [{
//     date: 'xxx',
//     price: 'xxx',
//     items: 'xxx'
//   }]
// }
export type PriceGroupsByDate = Dictionary<IPriceGroup[]>;
// {'2016-07-12': GroupKeyToPriceMap, ...}
export type PricesByDate = Dictionary<GroupKeyToPriceMap>;

// consumer price format
// {
//   '24-big|3-big|': 75,
//   '34-big|76-big|': 80,
//   '5-medium|82-medium|': 55,
//    ...
// }
export type GroupKeyToPriceMap = Dictionary<number>;
export type PriceList = Dictionary<number>;

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
  private lConfig: IAppConfig;

  constructor(
    private $http: IHttpService,
    private $log: ILogService,
    // private $timeout: ITimeoutService,
    private localStorageService: ILocalStorageService,
    private configService: ConfigService
  ) {
    'ngInject';

    this.configService.get().first().subscribe(config => this.lConfig = config);
  }

  fetchPriceGroupsForActualDays(): IPromise<PricesByDate> {
    const startDate = moment().format(SHORT_DATE_FORMAT);
    const endDate = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

    const url = this.lConfig.apiUrl + '/prices?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<PriceGroupsByDate>(url, {cache: true})
      .then(res => res.data)
      .then(priceGroupsByData => {
        const pricesByDate = this.priceGroupsByDateToPricesByDate(priceGroupsByData);
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

  private groupKeyForPriceGroup(priceGroup: IPriceGroup): string {
    const sortedPriceGroupItems = sortBy(priceGroup.items, 'productId');

    return reduce(sortedPriceGroupItems, (key, priceItem) => {
      return key + priceItem.productId + '-' + priceItem.size + '|';
    }, '');
  }

  private convertPriceGroupsToKeyPrice(priceGroups: IPriceGroup[]): GroupKeyToPriceMap {
    const keyPriceHash = {};

    each(priceGroups, priceGroup => {
      const groupKey = this.groupKeyForPriceGroup(priceGroup);
      keyPriceHash[groupKey] = priceGroup.price;
    });

    return keyPriceHash;
  }

  private calcFallbackPriceFor(lineItems: ILineItem[], prices: GroupKeyToPriceMap): number {
    return reduce(lineItems, (_, lineItem) => {
      return prices[this.groupKeyForLineItem(lineItem)];
    }, 0);
  }

  private storeToLocalStorage(prices: PricesByDate): boolean {
    if (!prices) {
      return false;
    }

    return this.localStorageService.set('pricesByDate', prices);
  }

  private getPricesFromLocalStorage(date: string): GroupKeyToPriceMap {
    const prices = this.localStorageService.get('pricesByDate');
    if (!prices) {
      return {};
    }

    return prices[date] || {};
  }
}
