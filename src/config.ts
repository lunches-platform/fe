/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';
type ILocalStorageServiceProvider = angular.local.storage.ILocalStorageServiceProvider;
type IDateLocaleProvider = angular.material.IDateLocaleProvider;

// todo: move to somewhere
export interface IAddress {
  details: string[];
  options: {
    floorSelector: boolean;
  };
}

// todo: move to somewhere
export interface IAppConfig {
  apiUrl: string;
  address: IAddress;
}

export const SHORT_DATE_FORMAT = 'YYYY-MM-DD';

function makeCounter() {
  let i = 0;
  return () => i++;
}

export const uniqId = makeCounter();

export default localeConfig;

export function localeConfig() {
  'ngInject';

  moment.locale('ru');
}

export function localStorageConfig(localStorageServiceProvider: ILocalStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider.setPrefix('l.');
}

export function dateRangeSelectorConfig($mdDateLocaleProvider: IDateLocaleProvider) {
  'ngInject';

  $mdDateLocaleProvider.formatDate = (date) => moment(date).format(SHORT_DATE_FORMAT);
}
