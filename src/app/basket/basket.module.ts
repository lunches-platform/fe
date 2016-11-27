import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

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
  imports: [CommonModule],
  exports: [
    BasketContainerComponent
  ]
})
export class BasketModule {
}
