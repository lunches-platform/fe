/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import 'todomvc-app-css/index.css';

import {TodoService} from './app/todos/todos';
import {App} from './app/containers/App';

import {WeekMenuComponent} from './app/components/week-menu/week-menu.component';
import {DayMenuComponent} from './app/components/day-menu/day-menu.component';
import {ProductComponent} from './app/components/product/product.component';

import {WeekMenuService} from './app/components/week-menu/week-menu.service';
import {DayMenuService} from './app/components/day-menu/day-menu.service';
import {ProductService} from './app/components/product/product.service';
import {OrderService} from './app/models/order.service';
import {BasketService} from './app/models/basket.service';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('todoService', TodoService)
  .component('app', App)

  .component('weekMenu', WeekMenuComponent)
  .component('dayMenu', DayMenuComponent)
  .component('product', ProductComponent)

  .service('weekMenuService', WeekMenuService)
  .service('dayMenuService', DayMenuService)
  .service('productService', ProductService)
  .service('orderService', OrderService)
  .service('basketService', BasketService);
