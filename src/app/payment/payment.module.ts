import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {PaymentRoutingModule} from './payment-routing.module';

import {
  PaymentComponent,
  PaymentContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [
    PaymentComponent,
    PaymentContainerComponent
  ],
  exports: [
    PaymentContainerComponent
  ]
})
export class PaymentModule {
}
