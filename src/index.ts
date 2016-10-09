/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-local-storage';
import 'angular-material/angular-material.css';


import {BasketComponent} from './app/containers/basket/basket.component';
import {ToolbarComponent as BasketToolbarComponent} from './app/containers/basket/toolbar.component';
import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {ToolbarComponent as WeekMenuToolbarComponent} from './app/containers/week-menu/toolbar.component';
import {MyOrdersComponent} from './app/containers/my-orders/my-orders.component';
import {ToolbarComponent as MyOrdersToolbarComponent} from './app/containers/my-orders/toolbar.component';
import {PaymentComponent} from './app/containers/payment/payment.component';
import {ToolbarComponent as PaymentToolbarComponent} from './app/containers/payment/toolbar.component';
import {PricesComponent} from './app/containers/prices/prices.component';
import {ToolbarComponent as PricesToolbarComponent} from './app/containers/prices/toolbar.component';

import {MenuComponent} from './app/components/menu/menu.component';
import {ViewMenuComponent} from './app/components/view-menu/view-menu.component';
import {LineItemComponent} from './app/components/line-item/line-item.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';
import {BasketOrderComponent} from './app/components/basket-order/basket-order.component';
import {MyOrdersItemComponent} from './app/components/my-orders-item/my-orders-item.component';
import {PaymentStatusComponent} from './app/components/payment-status/payment-status.component';
import {DateRangeSelectorComponent} from './app/components/date-range-selector/date-range-selector.component';
import {MenuCoverComponent} from './app/components/menu-cover/menu-cover.component';
import {UserCardComponent} from './app/components/user-card/user-card.component';
import {SwitchComponent} from './app/components/switch/switch.component';
import {FloorSelectorComponent} from './app/components/floor-selector/floor-selector.component';
import {SizeLabelComponent} from './app/components/size-label/size-label.component';
import {SidebarComponent} from './app/components/sidebar/sidebar.component';

import {MenuService} from './app/models/menu';
import {OrderService} from './app/models/order';
import {UserService} from './app/models/user';
import {ToastService} from './app/models/toast';
import {BasketService} from './app/models/basket';
import {LineItemService} from './app/models/line-item';
import {PriceService} from './app/models/price';

import './app/state/state';

import {DateFilter} from './app/filters/date.filter';

import {routesConfig} from './routes';
import {localeConfig, localStorageConfig, currentStateConfig, dateRangeSelectorConfig} from './config';

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
  .component('lMenuCover', MenuCoverComponent)
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

  return $http.get('/config.json').then((response) => {
    angular.module('app').constant('lConfig', response.data);
  }, (errorResponse) => {
    // todo: handle error case
  });
}

function bootstrap() {
  angular.element(document).ready(() => angular.bootstrap(document, ['app']));
}
