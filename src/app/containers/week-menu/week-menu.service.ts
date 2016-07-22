import * as moment from 'moment';
import {IHttpService, IPromise} from 'angular';

import {IMenu} from '../../components/menu/menu.service';

export interface IRes<T> {
  data: T[];
  status: number;
  statusText: string;
  config: any;
}

export class WeekMenuService {
  constructor(private $http: IHttpService) {
    'ngInject';
  }

  fetchPastDaysMenuForCurrentWeek(): IPromise<IMenu[]> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/menus/week/current';
    return this.$http.get(url)
      .then((res: IRes<IMenu>) => {
        return res.data
          .filter(menu => moment.utc(menu.date).isBefore(moment()));
      });
  }

  fetchActualMenuForCurrentWeek(): IPromise<IMenu[]> {
    // todo: do not hardcode BE URL: DEZ-774
    const url = 'http://api.cogniance.lunches.com.ua/menus/week/current';
    return this.$http.get(url)
      .then((res: IRes<IMenu>) => {
        return res.data
          .filter(menu => moment.utc(menu.date).isAfter(moment()));
      });
  }
}

