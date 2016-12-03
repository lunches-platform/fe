/// <reference path='../../typings/index.d.ts' />
import * as angular from 'angular';

// angular 1 vendors
import 'angular-material';
import 'angular-local-storage';
import 'angular-material/angular-material.css';

// angular 1 app container components
import { BasketComponent } from './containers/basket/basket.component';
import { ToolbarComponent as BasketToolbarComponent } from './containers/basket/toolbar.component';
import { WeekMenuComponent } from './containers/week-menu/week-menu.component';
import { ToolbarComponent as WeekMenuToolbarComponent } from './containers/week-menu/toolbar.component';
import { MyOrdersComponent } from './containers/my-orders/my-orders.component';
import { ToolbarComponent as MyOrdersToolbarComponent } from './containers/my-orders/toolbar.component';
import { PaymentComponent } from './containers/payment/payment.component';
import { ToolbarComponent as PaymentToolbarComponent } from './containers/payment/toolbar.component';
import { PricesComponent } from './containers/prices/prices.component';
import { ToolbarComponent as PricesToolbarComponent } from './containers/prices/toolbar.component';

// angular 1 app presentational components
import { MenuComponent } from './components/menu/menu.component';
import { ViewMenuComponent } from './components/view-menu/view-menu.component';
import { LineItemComponent } from './components/line-item/line-item.component';
import { SelectorComponent } from './components/selector/selector.component';
import { SizeSelectorComponent } from './components/size-selector/size-selector.component';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { BasketOrderComponent } from './components/basket-order/basket-order.component';
import { MyOrdersItemComponent } from './components/my-orders-item/my-orders-item.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { DateRangeSelectorComponent } from './components/date-range-selector/date-range-selector.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SwitchComponent } from './components/switch/switch.component';
import { FloorSelectorComponent } from './components/floor-selector/floor-selector.component';
import { SizeLabelComponent } from './components/size-label/size-label.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';

// angular 1 app material wrapper components to be used in angular 2
import { MdButtonComponent } from './components/md-button/md-button.component';
import { MdContentComponent } from './components/md-content/md-content.component';
import { MdToolbarComponent } from './components/md-toolbar/md-toolbar.component';
import { MdSidenavComponent } from './components/md-sidenav/md-sidenav.component';
import { MdIconComponent } from './components/md-icon/md-icon.component';
import { MdProgressLinearComponent } from './components/md-progress-linear/md-progress-linear.component';

// angular 1 app services
import { MenuService } from './models/menu';
import { OrderService } from './models/order';
import { UserService } from './models/user';
import { ToastService } from './models/toast';
import { BasketService } from './models/basket';
import { LineItemService } from './models/line-item';
import { PriceService } from './models/price';

// angular 1 app filters
import { DateFilter } from './filters/date.filter';

// angular 1 app configs
import { localeConfig, localStorageConfig, dateRangeSelectorConfig } from './config';

// angular 1 app styles
import './index.scss';

// angular 2 support libs
import 'core-js/client/shim.min';
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Rx';

// angular 2 platform
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

// angular 2 app
import { AppComponent } from '../app/app.component';
import { RouterWrapper } from '../app/core';
import { ConfigService } from '../app/config';

import {
  ExampleComponent,
  FlashMessageComponent,
  PastDaysSwitcherComponent,
  MenuCoverComponent
} from '../app/shared/components';

// -------------------------------------------------------------------------- //
angular
  .module('app', [
    'ngMaterial',
    'LocalStorageModule'
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
  .component('lMdProgressLinear', MdProgressLinearComponent)

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

