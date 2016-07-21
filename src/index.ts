/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {BasketComponent} from './app/containers/basket/basket.component';
import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {MenuComponent} from './app/components/menu/menu.component';
import {ViewMenuComponent} from './app/components/view-menu/view-menu.component';
import {LineItemComponent} from './app/components/line-item/line-item.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';
import {BasketOrderComponent} from './app/components/basket-order/basket-order.component';

import {WeekMenuService} from './app/containers/week-menu/week-menu.service';
import {LineItemService} from './app/components/line-item/line-item.service';
import {OrderService} from './app/models/order.service';
import {OrderFormService} from './app/components/menu/order.form';
import {BasketService} from './app/containers/basket/basket.service';

import {DateFilter} from './app/filters/date.filter';

import 'angular-ui-router';
import 'angular-material';
import 'angular-local-storage';
import 'angular-material/angular-material.css';
import {routesConfig} from './routes';
import {localeConfig, localStorageConfig} from './config';

import './index.scss';

angular
  .module('app', ['ui.router', 'ngMaterial', 'LocalStorageModule'])
  .config(routesConfig)
  .config(localeConfig)
  .config(localStorageConfig)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lMenu', MenuComponent)
  .component('lViewMenu', ViewMenuComponent)
  .component('lLineItem', LineItemComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasket', BasketComponent)
  .component('lBasketOrder', BasketOrderComponent)

  .service('lWeekMenuService', WeekMenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lOrderFormService', OrderFormService)
  .service('lBasketService', BasketService)

  .filter('lDate', DateFilter)
  ;
