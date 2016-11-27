import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {upgradeAdapter} from '../upgrade-adapter';

import {BasketRoutingModule} from './basket-routing.module';

import {
  BasketContainerComponent
} from './components';

const BasketComponent = upgradeAdapter.upgradeNg1Component('lBasket');

@NgModule({
  imports: [
    SharedModule,
    BasketRoutingModule
  ],
  declarations: [
    BasketComponent,
    BasketContainerComponent
  ],
  exports: [
    BasketContainerComponent
  ]
})
export class BasketModule {
}
