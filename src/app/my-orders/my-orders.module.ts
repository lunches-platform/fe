import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {MyOrdersRoutingModule} from './my-orders-routing.module';

import {
  MyOrdersComponent,
  MyOrdersContainerComponent
} from './components';

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
