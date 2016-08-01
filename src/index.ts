/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {BasketComponent} from './app/containers/basket/basket.component';
import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {MyOrdersComponent} from './app/containers/my-orders/my-orders.component';

import {MenuComponent} from './app/components/menu/menu.component';
import {ViewMenuComponent} from './app/components/view-menu/view-menu.component';
import {LineItemComponent} from './app/components/line-item/line-item.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';
import {BasketOrderComponent} from './app/components/basket-order/basket-order.component';
import {WeekSwitcherComponent} from './app/components/week-switcher/week-switcher.component';
import {ToolbarComponent} from './app/components/toolbar/toolbar.component';
import {MyOrdersItemComponent} from './app/components/my-orders-item/my-orders-item.component';
import {ViewOrderComponent} from './app/components/view-order/view-order.component';
import {EditOrderComponent} from './app/components/edit-order/edit-order.component';
import {PaymentStatusComponent} from './app/components/payment-status/payment-status.component';

import {BasketService} from './app/containers/basket/basket.service';
import {LineItemService} from './app/components/line-item/line-item.service';
import {OrderFormService} from './app/components/menu/order.form';

import {MenuService} from './app/models/menu';
import {OrderService} from './app/models/order';
import {UserService} from './app/models/user';
import {ToastService} from './app/models/toast';

import {DateFilter} from './app/filters/date.filter';

import 'angular-ui-router';
import 'angular-material';
import 'angular-local-storage';

import 'angular-material/angular-material.css';

import {routesConfig} from './routes';
import {localeConfig, localStorageConfig, currentStateConfig} from './config';

import './index.scss';

// fake-api: comment out when API implemented
// import 'angular-mocks';
// import {fakeApiConfig} from './fake-api/config';

angular
  .module('app', [
    'ui.router',
    'ngMaterial',
    'LocalStorageModule',
    // fake-api: comment out when API implemented
    // 'ngMockE2E'
  ])
  .config(routesConfig)
  .config(localeConfig)
  .config(localStorageConfig)
  .run(currentStateConfig)

  // fake-api: comment out when API implemented
  // .run(fakeApiConfig)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lBasket', BasketComponent)
  .component('lMyOrders', MyOrdersComponent)

  .component('lMenu', MenuComponent)
  .component('lViewMenu', ViewMenuComponent)
  .component('lLineItem', LineItemComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasketOrder', BasketOrderComponent)
  .component('lWeekSwitcher', WeekSwitcherComponent)
  .component('lToolbar', ToolbarComponent)
  .component('lMyOrdersItem', MyOrdersItemComponent)
  .component('lViewOrder', ViewOrderComponent)
  .component('lEditOrder', EditOrderComponent)
  .component('lPaymentStatus', PaymentStatusComponent)

  .service('lMenuService', MenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lOrderFormService', OrderFormService)
  .service('lBasketService', BasketService)
  .service('lUserService', UserService)
  .service('lToastService', ToastService)

  .filter('lDate', DateFilter)
  ;
