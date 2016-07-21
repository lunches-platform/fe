/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';
type ILocalStorageServiceProvider = angular.local.storage.ILocalStorageServiceProvider;
import {IStateService} from 'angular-ui-router';
import {IRootScopeService} from 'angular';

// todo: is it correct place?
export interface ILRootScope extends IRootScopeService {
  $state: IStateService;
}

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
