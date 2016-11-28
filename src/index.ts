/// <reference path='../typings/index.d.ts' />
import * as angular from 'angular';

// angular 1 vendors
import 'angular-material';
import 'angular-local-storage';
import 'angular-material/angular-material.css';

// angular 1 app container components
import {BasketComponent} from './app.ng1/containers/basket/basket.component';
import {ToolbarComponent as BasketToolbarComponent} from './app.ng1/containers/basket/toolbar.component';
import {WeekMenuComponent} from './app.ng1/containers/week-menu/week-menu.component';
import {ToolbarComponent as WeekMenuToolbarComponent} from './app.ng1/containers/week-menu/toolbar.component';
import {MyOrdersComponent} from './app.ng1/containers/my-orders/my-orders.component';
import {ToolbarComponent as MyOrdersToolbarComponent} from './app.ng1/containers/my-orders/toolbar.component';
import {PaymentComponent} from './app.ng1/containers/payment/payment.component';
import {ToolbarComponent as PaymentToolbarComponent} from './app.ng1/containers/payment/toolbar.component';
import {PricesComponent} from './app.ng1/containers/prices/prices.component';
import {ToolbarComponent as PricesToolbarComponent} from './app.ng1/containers/prices/toolbar.component';

// angular 1 app presentational components
import {MenuComponent} from './app.ng1/components/menu/menu.component';
import {ViewMenuComponent} from './app.ng1/components/view-menu/view-menu.component';
import {LineItemComponent} from './app.ng1/components/line-item/line-item.component';
import {SelectorComponent} from './app.ng1/components/selector/selector.component';
import {SizeSelectorComponent} from './app.ng1/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app.ng1/components/quantity-selector/quantity-selector.component';
import {BasketOrderComponent} from './app.ng1/components/basket-order/basket-order.component';
import {MyOrdersItemComponent} from './app.ng1/components/my-orders-item/my-orders-item.component';
import {PaymentStatusComponent} from './app.ng1/components/payment-status/payment-status.component';
import {DateRangeSelectorComponent} from './app.ng1/components/date-range-selector/date-range-selector.component';
import {UserCardComponent} from './app.ng1/components/user-card/user-card.component';
import {SwitchComponent} from './app.ng1/components/switch/switch.component';
import {FloorSelectorComponent} from './app.ng1/components/floor-selector/floor-selector.component';
import {SizeLabelComponent} from './app.ng1/components/size-label/size-label.component';
import {SidebarComponent} from './app.ng1/components/sidebar/sidebar.component';
import {ListComponent} from './app.ng1/components/list/list.component';

// angular 1 app material wrapper components to be used in angular 2
import {MdButtonComponent} from './app.ng1/components/md-button/md-button.component';
import {MdContentComponent} from './app.ng1/components/md-content/md-content.component';
import {MdToolbarComponent} from './app.ng1/components/md-toolbar/md-toolbar.component';
import {MdSidenavComponent} from './app.ng1/components/md-sidenav/md-sidenav.component';
import {MdIconComponent} from './app.ng1/components/md-icon/md-icon.component';

// angular 1 app services
import {MenuService} from './app.ng1/models/menu';
import {OrderService} from './app.ng1/models/order';
import {UserService} from './app.ng1/models/user';
import {ToastService} from './app.ng1/models/toast';
import {BasketService} from './app.ng1/models/basket';
import {LineItemService} from './app.ng1/models/line-item';
import {PriceService} from './app.ng1/models/price';

// angular 1 app filters
import {DateFilter} from './app.ng1/filters/date.filter';

// angular 1 app configs
import {localeConfig, localStorageConfig, dateRangeSelectorConfig} from './config';

// angular 1 app styles
import './index.scss';

// angular 2 support libs
import 'core-js/client/shim.min';
import 'zone.js/dist/zone';
import 'reflect-metadata/Reflect';
import 'rxjs/Rx';

// angular 2 platform
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import {downgradeComponent, downgradeInjectable} from '@angular/upgrade/static';

// angular 2 app
import {AppComponent} from './app/app.component';
import {RouterWrapper} from './app/ng1';
import {ConfigService} from './app/config';

import {
  ExampleComponent,
  FlashMessageComponent,
  PastDaysSwitcherComponent,
  MenuCoverComponent
} from './app/shared/components';

// fake-api
// import 'angular-mocks';
// import {fakeApiConfig} from './fake-api/config';

// -------------------------------------------------------------------------- //
angular
  .module('app', [
    'ngMaterial',
    'LocalStorageModule',
    // 'ngMockE2E'
  ])
  .constant('lConfig', {
    address: {
      details: [
        'Company Name',
        'Street Name',
        'Building Number',
        'Floor number'
      ],
      options: {
        'floorSelector': true
      }
    },
    apiUrl: 'http://api.example.com'
  })
  .config(localeConfig)
  .config(localStorageConfig)
  .config(dateRangeSelectorConfig)

  // fake-api: comment out when API implemented
  // .run(fakeApiConfig)

  // angular 1 app container components
  .component('lWeekMenu', WeekMenuComponent)
  .component('lBasket', BasketComponent)
  .component('lMyOrders', MyOrdersComponent)
  .component('lPayment', PaymentComponent)

  // angular 1 app presentational
  .component('lMenu', MenuComponent)
  .component('lViewMenu', ViewMenuComponent)
  .component('lLineItem', LineItemComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasketOrder', BasketOrderComponent)
  .component('lMyOrdersItem', MyOrdersItemComponent)
  .component('lPaymentStatus', PaymentStatusComponent)
  .component('lDateRangeSelector', DateRangeSelectorComponent)
  .component('lUserCard', UserCardComponent)
  .component('lSwitch', SwitchComponent)
  .component('lWeekMenuToolbar', WeekMenuToolbarComponent)
  .component('lBasketToolbar', BasketToolbarComponent)
  .component('lMyOrdersToolbar', MyOrdersToolbarComponent)
  .component('lFloorSelector', FloorSelectorComponent)
  .component('lSizeLabel', SizeLabelComponent)
  .component('lPaymentToolbar', PaymentToolbarComponent)
  .component('lSidebar', SidebarComponent)
  .component('lPrices', PricesComponent)
  .component('lPricesToolbar', PricesToolbarComponent)
  .component('lList', ListComponent)

  // angular 1 app material wrapper components to be used in angular 2
  .component('lMdButton', MdButtonComponent)
  .component('lMdContent', MdContentComponent)
  .component('lMdToolbar', MdToolbarComponent)
  .component('lMdSidenav', MdSidenavComponent)
  .component('lMdIcon', MdIconComponent)

  // angular 1 app services
  .service('lMenuService', MenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lBasketService', BasketService)
  .service('lUserService', UserService)
  .service('lToastService', ToastService)
  .service('lPriceService', PriceService)
  .factory('router', downgradeInjectable(RouterWrapper))
  .factory('configService', downgradeInjectable(ConfigService))

  // angular 1 app filters
  .filter('lDate', DateFilter)

  // angular 2 app components to be used in angular 1 app
  .directive('lApp', downgradeComponent({component: AppComponent}) as angular.IDirectiveFactory)
  .directive('lExample', downgradeComponent({component: ExampleComponent}) as angular.IDirectiveFactory)
  .directive('lFlashMessage', downgradeComponent({component: FlashMessageComponent}) as angular.IDirectiveFactory)
  .directive('lPastDaysSwitcher', downgradeComponent({
    component: PastDaysSwitcherComponent,
    inputs: ['switched'],
    outputs: ['switch']
  }) as angular.IDirectiveFactory)
  .directive('lMenuCover', downgradeComponent({
    component: MenuCoverComponent,
    inputs: ['url']
  }) as angular.IDirectiveFactory)
  ;

import './app/main';
