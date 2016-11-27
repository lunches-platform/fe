import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {upgradeAdapter} from '../upgrade-adapter';

import {PaymentRoutingModule} from './payment-routing.module';

import {
  PaymentContainerComponent
} from './components';

const PaymentComponent = upgradeAdapter.upgradeNg1Component('lPayment');

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
