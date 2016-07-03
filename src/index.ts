/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {BasketComponent} from './app/containers/basket.component';

import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {MenuComponent} from './app/components/menu/menu.component';
import {LineItemComponent} from './app/components/line-item/line-item.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';

import {WeekMenuService} from './app/containers/week-menu/week-menu.service';
import {LineItemService} from './app/components/line-item/line-item.service';
import {OrderService} from './app/models/order.service';
import {OrderFormService} from './app/components/menu/order.form';

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
  .component('lLineItem', LineItemComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasket', BasketComponent)

  .service('lWeekMenuService', WeekMenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lOrderFormService', OrderFormService)

  .filter('lDate', DateFilter)
  ;
