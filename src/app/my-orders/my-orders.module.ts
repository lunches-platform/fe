import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { MyOrdersRoutingModule } from './my-orders-routing.module';

import {
  MyOrdersDirective,
  MyOrdersContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    MyOrdersRoutingModule
  ],
  declarations: [
    MyOrdersDirective,
    MyOrdersContainerComponent
  ],
  exports: [
    MyOrdersContainerComponent
  ]
})
export class MyOrdersModule {
}
