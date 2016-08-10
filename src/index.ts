/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {BasketComponent} from './app/containers/basket/basket.component';
import {ToolbarComponent as BasketToolbarComponent} from './app/containers/basket/toolbar.component';
import {WeekMenuComponent} from './app/containers/week-menu/week-menu.component';
import {ToolbarComponent as WeekMenuToolbarComponent} from './app/containers/week-menu/toolbar.component';
import {MyOrdersComponent} from './app/containers/my-orders/my-orders.component';
import {ToolbarComponent as MyOrdersToolbarComponent} from './app/containers/my-orders/toolbar.component';

import {MenuComponent} from './app/components/menu/menu.component';
import {ViewMenuComponent} from './app/components/view-menu/view-menu.component';
import {LineItemComponent} from './app/components/line-item/line-item.component';
import {SelectorComponent} from './app/components/selector/selector.component';
import {SizeSelectorComponent} from './app/components/size-selector/size-selector.component';
import {QuantitySelectorComponent} from './app/components/quantity-selector/quantity-selector.component';
import {BasketOrderComponent} from './app/components/basket-order/basket-order.component';
import {MyOrdersItemComponent} from './app/components/my-orders-item/my-orders-item.component';
import {ViewOrderComponent} from './app/components/view-order/view-order.component';
import {EditOrderComponent} from './app/components/edit-order/edit-order.component';
import {PaymentStatusComponent} from './app/components/payment-status/payment-status.component';
import {DateRangeSelectorComponent} from './app/components/date-range-selector/date-range-selector.component';
import {MenuCoverComponent} from './app/components/menu-cover/menu-cover.component';
import {UserCardComponent} from './app/components/user-card/user-card.component';
import {SwitchComponent} from './app/components/switch/switch.component';
import {FloorSelectorComponent} from './app/components/floor-selector/floor-selector.component';
import {PaymentCardComponent} from './app/components/payment-card/payment-card.component';

import {MenuService} from './app/models/menu';
import {OrderService} from './app/models/order';
import {UserService} from './app/models/user';
import {ToastService} from './app/models/toast';
import {BasketService} from './app/models/basket';
import {LineItemService} from './app/models/line-item';
import {PriceService} from './app/models/price';

import {DateFilter} from './app/filters/date.filter';

import 'angular-ui-router';
import 'angular-material';
import 'angular-local-storage';

import 'angular-material/angular-material.css';

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

  .component('lMenu', MenuComponent)
  .component('lViewMenu', ViewMenuComponent)
  .component('lLineItem', LineItemComponent)
  .component('lSelector', SelectorComponent)
  .component('lSizeSelector', SizeSelectorComponent)
  .component('lQuantitySelector', QuantitySelectorComponent)
  .component('lBasketOrder', BasketOrderComponent)
  .component('lMyOrdersItem', MyOrdersItemComponent)
  .component('lViewOrder', ViewOrderComponent)
  .component('lEditOrder', EditOrderComponent)
  .component('lPaymentStatus', PaymentStatusComponent)
  .component('lDateRangeSelector', DateRangeSelectorComponent)
  .component('lMenuCover', MenuCoverComponent)
  .component('lUserCard', UserCardComponent)
  .component('lSwitch', SwitchComponent)
  .component('lWeekMenuToolbar', WeekMenuToolbarComponent)
  .component('lBasketToolbar', BasketToolbarComponent)
  .component('lMyOrdersToolbar', MyOrdersToolbarComponent)
  .component('lFloorSelector', FloorSelectorComponent)
  .component('lPaymentCard', PaymentCardComponent)

  .service('lMenuService', MenuService)
  .service('lLineItemService', LineItemService)
  .service('lOrderService', OrderService)
  .service('lBasketService', BasketService)
  .service('lUserService', UserService)
  .service('lToastService', ToastService)
  .service('lPriceService', PriceService)

  .filter('lDate', DateFilter)
  ;
