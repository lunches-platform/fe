import {each, filter} from 'lodash';
import * as moment from 'moment';
import {IHttpService, IPromise} from 'angular';

import {SHORT_DATE_FORMAT} from '../../config';

import {IProduct} from './product';

export interface IMenu {
  id: number;
  date: string;
  products: IProduct[];
}

export class MenuService {

  constructor(private $http: IHttpService) {
    'ngInject';
  }

  fetchTwoWeekMenu(): IPromise<IMenu[][]> {
    const startDate = moment().startOf('week').format(SHORT_DATE_FORMAT);
    const endDate = moment().add(1, 'weeks').endOf('week').format(SHORT_DATE_FORMAT);

    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/menus?startDate=' + startDate + '&endDate=' + endDate;
    return this.$http.get<IMenu[]>(url).then(res => this.splitToCurrentAndNextWeekMenu(res.data));
  }

  splitToCurrentAndNextWeekMenu(menus: IMenu[]): IMenu[][] {
    const currentWeekMenu = [];
    const nextWeekMenu = [];

    each(menus, menu => {
      if (this.isInsideCurrentWeek(menu.date)) {
        currentWeekMenu.push(menu);
      } else if (this.isInsideNextWeek(menu.date)) {
        nextWeekMenu.push(menu);
      }
    });

    return [currentWeekMenu, nextWeekMenu];
  }

  splitToPastAndActualDaysMenu(menus: IMenu[]): IMenu[][] {
    const pastDaysMenu = [];
    const actualDaysMenu = [];

    each(menus, menu => {
      if (moment(menu.date).isBefore(moment())) {
        pastDaysMenu.push(menu);
      } else {
        actualDaysMenu.push(menu);
      }
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

