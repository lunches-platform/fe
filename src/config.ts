/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';
type ILocalStorageServiceProvider = angular.local.storage.ILocalStorageServiceProvider;
import {IStateService} from 'angular-ui-router';
import {IRootScopeService, IChangesObject} from 'angular';

// todo: is it correct place?
export interface ILRootScope extends IRootScopeService {
  $state: IStateService;
}

// todo: is it correct place?
export interface IChangesList {
  [property: string]: IChangesObject;
}

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
