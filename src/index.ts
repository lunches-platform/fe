/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {AppComponent} from './app/containers/app.component';

import {WeekMenuComponent} from './app/components/week-menu/week-menu.component';
import {MenuComponent} from './app/components/menu/menu.component';
import {ProductComponent} from './app/components/product/product.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';

import {WeekMenuService} from './app/components/week-menu/week-menu.service';
import {MenuService} from './app/components/menu/menu.service';
import {ProductService} from './app/components/product/product.service';
import {OrderService} from './app/models/order.service';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .component('lApp', AppComponent)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lMenu', MenuComponent)
  .component('lProduct', ProductComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)

  .service('lWeekMenuService', WeekMenuService)
  .service('lMenuService', MenuService)
  .service('lProductService', ProductService)
  .service('lOrderService', OrderService)
  ;
