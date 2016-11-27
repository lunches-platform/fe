import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PaymentContainerComponent} from './components';

const routes: Routes = [
  {path: 'payment', component: PaymentContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
