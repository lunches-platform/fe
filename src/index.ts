/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {BasketComponent} from './app/containers/basket.component';

import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {MenuComponent} from './app/components/menu/menu.component';
import {ProductComponent} from './app/components/product/product.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';

import {WeekMenuService} from './app/containers/week-menu/week-menu.service';
import {MenuService} from './app/components/menu/menu.service';
import {ProductService} from './app/components/product/product.service';
import {OrderService} from './app/models/order.service';

import {DateFilter} from './app/filters/date.filter';

import 'angular-ui-router';
import routesConfig from './routes';
import localeConfig from './config';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .config(localeConfig)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lMenu', MenuComponent)
  .component('lProduct', ProductComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasket', BasketComponent)

  .service('lWeekMenuService', WeekMenuService)
  .service('lMenuService', MenuService)
  .service('lProductService', ProductService)
  .service('lOrderService', OrderService)

  .filter('lDate', DateFilter)
  ;
