/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';
import {IRootScopeService} from 'angular';
import {IStateService} from 'angular-ui-router';
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

// todo: is it correct place?
export interface ILRootScope extends IRootScopeService {
  $state: IStateService;
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

export function currentStateConfig($rootScope: ILRootScope, $state: IStateService) {
  'ngInject';

  $rootScope.$state = $state;
}

export function dateRangeSelectorConfig($mdDateLocaleProvider: IDateLocaleProvider) {
  'ngInject';

  $mdDateLocaleProvider.formatDate = (date) => moment(date).format(SHORT_DATE_FORMAT);
}
