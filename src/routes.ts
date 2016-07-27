/// <reference path="../typings/index.d.ts" />
import {IOrder} from './app/models/order';
import {IStateProvider, IUrlRouterProvider, IStateService, IStateParamsService} from 'angular-ui-router';
import {ILocationProvider} from 'angular';

export default routesConfig;

export interface IBaseState extends IStateService {
  data: {
    title: string;
  };
}

export interface IWeekMenuState extends IBaseState {
}

export interface IBasketState extends IBaseState {
  params: IBasketStateParams;
}

export interface IBasketStateParams extends IStateParamsService {
  order: IOrder;
}

export function routesConfig(
  $stateProvider: IStateProvider,
  $urlRouterProvider: IUrlRouterProvider,
  $locationProvider: ILocationProvider
) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('week-menu', {
      url: '/',
      template: '<l-week-menu/>',
      data: {
        title: null
      }
    })
    .state('basket', {
      url: '/basket',
      template: '<l-basket/>',
      data: {
        title: 'Корзина'
      }
    });
}
