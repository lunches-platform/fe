import {each, filter} from 'lodash';
import * as moment from 'moment';
import {IHttpService, IPromise} from 'angular';

import {SHORT_DATE_FORMAT} from '../../config';

import {IProduct} from './product';

export interface IMenu {
  id: number;
  date: string;
  products: IProduct[];
  type: MenuType;
}

export interface IWeekMenu<Type, ItemType> {
  Type: ItemType[];
}

export type MenuType = 'regular' | 'diet';

export class MenuService {

  // todo: add type for lConfig
  constructor(private $http: IHttpService, private lConfig) {
    'ngInject';
  }

  fetchTwoWeekMenu(): IPromise<IWeekMenu<MenuType, IMenu>[]> {
    const startDate = moment().startOf('week').format(SHORT_DATE_FORMAT);
    const endDate = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

    // todo: do not hardcode BE URL: DEZ-774
    const url = this.lConfig.apiUrl + '/menus?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<IMenu[]>(url, {cache: true}).then(res => this.splitToCurrentAndNextWeekMenu(res.data));
  }

  // todo: simplify
  splitToCurrentAndNextWeekMenu(menus: IMenu[]): IWeekMenu<MenuType, IMenu>[] {
    // todo: avoid any
    const currentWeekMenu: any = {diet: [], regular: []};
    const nextWeekMenu: any = {diet: [], regular: []};

    each(menus, menu => {
      if (this.isInsideCurrentWeek(menu.date)) {
        currentWeekMenu[menu.type].push(menu);
      } else if (this.isInsideNextWeek(menu.date)) {
        nextWeekMenu[menu.type].push(menu);
      }
    });

    return [currentWeekMenu, nextWeekMenu];
  }

  // todo: simplify
  splitToPastAndActualDaysMenu(weekMenuByType: IWeekMenu<MenuType, IMenu>): IWeekMenu<MenuType, IMenu>[] {
    // todo: avoid any
    const pastDaysMenu: any = {diet: [], regular: []};
    const actualDaysMenu: any = {diet: [], regular: []};

    each(weekMenuByType, weekMenu => {
      each(weekMenu, dayMenu => {
        if (moment(dayMenu.date).isBefore(moment())) {
          pastDaysMenu[dayMenu.type].push(dayMenu);
        } else {
          actualDaysMenu[dayMenu.type].push(dayMenu);
        }
      });
    });

    return [pastDaysMenu, actualDaysMenu];
  }

  findPastDaysMenuIn(menus: IMenu[]): IMenu[] {
    return filter<IMenu>(menus, menu => {
      return moment(menu.date).isBefore(moment());
    });
  }

  // todo: get correct cover
  getCoverOf(menu: IMenu, productIndex: number): string {
    return menu.products[productIndex].images[0].url;
  }

  private isInsideCurrentWeek(date: string): boolean {
    return moment(date).isBetween(
      moment().startOf('week'),
      moment().endOf('week'),
      'days',
      '[]'
    );
  }

  private isInsideNextWeek(date: string): boolean {
    return moment(date).isBetween(
      moment().add(1, 'weeks').startOf('week'),
      moment().add(1, 'weeks').endOf('week'),
      'days',
      '[]'
    );
  }
}

