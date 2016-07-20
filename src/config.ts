/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';
type ILocalStorageServiceProvider = angular.local.storage.ILocalStorageServiceProvider;

export default localeConfig;

export function localeConfig() {
  'ngInject';

  moment.locale('ru');
}

export function localStorageConfig(localStorageServiceProvider: ILocalStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider.setPrefix('l.');
}
