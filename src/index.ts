/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {AppComponent} from './app/containers/app.component';

import {WeekMenuComponent} from './app/components/week-menu/week-menu.component';
import {DayMenuComponent} from './app/components/day-menu/day-menu.component';
import {ProductComponent} from './app/components/product/product.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {AmountSelectorComponent} from './app/components/amount-selector/amount-selector.component';

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
  .component('lApp', AppComponent)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lDayMenu', DayMenuComponent)
  .component('lProduct', ProductComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lAmountSelector', AmountSelectorComponent)

  .service('lWeekMenuService', WeekMenuService)
  .service('lDayMenuService', DayMenuService)
  .service('lProductService', ProductService)
  .service('lOrderService', OrderService)
  .service('lBasketService', BasketService);
