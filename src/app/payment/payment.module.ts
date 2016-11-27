import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PaymentRoutingModule} from './payment-routing.module';

import {upgradeAdapter} from '../upgrade-adapter';

import {
  PaymentContainerComponent
} from './components';

const PaymentComponent = upgradeAdapter.upgradeNg1Component('lPayment');

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentContainerComponent
  ],
  imports: [CommonModule, PaymentRoutingModule],
  exports: [
    PaymentContainerComponent
  ]
})
export class PaymentModule {
}
