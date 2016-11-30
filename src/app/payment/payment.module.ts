import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { PaymentRoutingModule } from './payment-routing.module';

import {
  PaymentDirective,
  PaymentContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [
    PaymentDirective,
    PaymentContainerComponent
  ],
  exports: [
    PaymentContainerComponent
  ]
})
export class PaymentModule {
}
