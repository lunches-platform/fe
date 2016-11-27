import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {upgradeAdapter} from '../upgrade-adapter';

import {
  MyOrdersContainerComponent
} from './components';

const MyOrdersComponent = upgradeAdapter.upgradeNg1Component('lMyOrders');

@NgModule({
  declarations: [
    MyOrdersComponent,
    MyOrdersContainerComponent
  ],
  imports: [CommonModule],
  exports: [
    MyOrdersContainerComponent
  ]
})
export class MyOrdersModule {
}
