/// <reference path="../typings/index.d.ts" />

import {Order} from './app/models/order.service';

export default routesConfig;

export interface IWeekMenuState extends ng.ui.IStateService {
}

export interface IBasketState extends ng.ui.IStateService {
  params: IBasketStateParams;
}

export interface IBasketStateParams extends ng.ui.IStateParamsService {
  order: Order;
}

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('week-menu', {
      url: '/',
      template: '<l-week-menu/>'
    })
    .state('basket', {
      url: '/basket',
      template: '<l-basket/>',
      params: {
        order: null
      }
    });
}
