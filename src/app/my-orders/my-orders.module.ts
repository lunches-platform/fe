import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {upgradeAdapter} from '../upgrade-adapter';

import {MyOrdersRoutingModule} from './my-orders-routing.module';

import {
  MyOrdersContainerComponent
} from './components';

const MyOrdersComponent = upgradeAdapter.upgradeNg1Component('lMyOrders');

@NgModule({
  imports: [
    SharedModule,
    MyOrdersRoutingModule
  ],
  declarations: [
    MyOrdersComponent,
    MyOrdersContainerComponent
  ],
  exports: [
    MyOrdersContainerComponent
  ]
})
export class MyOrdersModule {
}
