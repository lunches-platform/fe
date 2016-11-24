/// <reference path="../typings/index.d.ts" />
import * as angular from 'angular';

// angular 2 support libs
import 'core-js/client/shim.min';
import 'zone.js/dist/zone';
import 'reflect-metadata/Reflect';
import 'rxjs/Rx';

// angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import 'angular-ui-router';
import 'angular-material';
import 'angular-local-storage';
import 'angular-material/angular-material.css';

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

// angular material wrapper imports
import {MdButtonComponent} from './app.ng1/components/md-button/md-button.component';
import {MdContentComponent} from './app.ng1/components/md-content/md-content.component';
import {MdToolbarComponent} from './app.ng1/components/md-toolbar/md-toolbar.component';
import {MdSidenavComponent} from './app.ng1/components/md-sidenav/md-sidenav.component';
import {MdListComponent} from './app.ng1/components/md-list/md-list.component';
import {MdListItemComponent} from './app.ng1/components/md-list-item/md-list-item.component';
import {MdIconComponent} from './app.ng1/components/md-icon/md-icon.component';

import {MenuService} from './app.ng1/models/menu';
import {OrderService} from './app.ng1/models/order';
import {UserService} from './app.ng1/models/user';
import {ToastService} from './app.ng1/models/toast';
import {BasketService} from './app.ng1/models/basket';
import {LineItemService} from './app.ng1/models/line-item';
import {PriceService} from './app.ng1/models/price';

import {DateFilter} from './app.ng1/filters/date.filter';

import {routesConfig} from './routes';
import {localeConfig, localStorageConfig, currentStateConfig, dateRangeSelectorConfig, IAppConfig} from './config';

// -------------------------------------------------------------------------- //
// angular 2 imports: BEGIN
// -------------------------------------------------------------------------- //
import {upgradeAdapter} from './app/upgrade-adapter';
import {AppComponent} from './app/app.component';
import {AppModule} from './app/app.module';
import {
  ExampleComponent,
  FlashMessageComponent,
  PastDaysSwitcherComponent,
  MenuCoverComponent
} from './app/shared/components';
// -------------------------------------------------------------------------- //
// angular 2 imports: END
// -------------------------------------------------------------------------- //

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
  .config(dateRangeSelectorConfig)
  .run(currentStateConfig)

  // fake-api: comment out when API implemented
  // .run(fakeApiConfig)

  .component('lWeekMenu', WeekMenuComponent)
  .component('lBasket', BasketComponent)
  .component('lMyOrders', MyOrdersComponent)
  .component('lPayment', PaymentComponent)

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

  // angular material wrapper definitions
  .component('lMdButton', MdButtonComponent)
  .component('lMdContent', MdContentComponent)
  .component('lMdToolbar', MdToolbarComponent)
  .component('lMdSidenav', MdSidenavComponent)
  .component('lMdList', MdListComponent)
  .component('lMdListItem', MdListItemComponent)
  .component('lMdIcon', MdIconComponent)
  // -------------------------------------------------------------------------- //
  // angular 2 components: BEGIN
  // -------------------------------------------------------------------------- //
  // if no any specified we have such error:
  // "Argument of type 'Function' is not assignable to parameter of type 'any[]'"
  // it looks like angular typings issue
  .directive('lApp', <any> upgradeAdapter.downgradeNg2Component(AppComponent))
  .directive('lExample', <any> upgradeAdapter.downgradeNg2Component(ExampleComponent))
  .directive('lFlashMessage', <any> upgradeAdapter.downgradeNg2Component(FlashMessageComponent))
  .directive('lPastDaysSwitcher', <any> upgradeAdapter.downgradeNg2Component(PastDaysSwitcherComponent))
  .directive('lMenuCover', <any> upgradeAdapter.downgradeNg2Component(MenuCoverComponent))
  // -------------------------------------------------------------------------- //
  // angular 2 components: END
  // -------------------------------------------------------------------------- //

  .service('lMenuService', MenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lBasketService', BasketService)
  .service('lUserService', UserService)
  .service('lToastService', ToastService)
  .service('lPriceService', PriceService)

  .filter('lDate', DateFilter)
  ;

fetchConfig().then(bootstrap);

function fetchConfig() {
  const $http = angular.injector(['ng']).get('$http');

  return $http.get<IAppConfig>('/config.json').then(response => {
    angular.module('app').constant('lConfig', response.data);
  }, () => {
    // todo: handle error case
  });
}

function bootstrap() {
  angular.element(document).ready(() => {
    upgradeAdapter['ng2AppModule'] = AppModule;
    upgradeAdapter.bootstrap(document.body, ['app']);
  });
}
