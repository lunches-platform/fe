/// <reference path="../typings/index.d.ts" />
import {Order} from './app/models/order.service';
import {IStateProvider, IUrlRouterProvider, IStateService, IStateParamsService} from 'angular-ui-router';
import {ILocationProvider} from 'angular';

export default routesConfig;

export interface IWeekMenuState extends IStateService {
}

export interface IBasketState extends IStateService {
  params: IBasketStateParams;
}

export interface IBasketStateParams extends IStateParamsService {
  order: Order;
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
        title: 'Меню на текущую неделю'
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
