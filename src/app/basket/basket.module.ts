import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {BasketRoutingModule} from './basket-routing.module';

import {upgradeAdapter} from '../upgrade-adapter';

import {
  BasketContainerComponent
} from './components';

const BasketComponent = upgradeAdapter.upgradeNg1Component('lBasket');

@NgModule({
  declarations: [
    BasketComponent,
    BasketContainerComponent
  ],
  imports: [CommonModule, BasketRoutingModule],
  exports: [
    BasketContainerComponent
  ]
})
export class BasketModule {
}
