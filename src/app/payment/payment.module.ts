import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

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
  imports: [CommonModule],
  exports: [
    PaymentContainerComponent
  ]
})
export class PaymentModule {
}
