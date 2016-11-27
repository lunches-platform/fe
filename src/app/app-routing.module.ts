import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WeekMenuContainerComponent} from './week-menu';
import {BasketContainerComponent} from './basket';
import {PaymentContainerComponent} from './payment';
import {MyOrdersContainerComponent} from './my-orders';
import {CounterContainerComponent} from './counter';

const routes: Routes = [
  {path: 'week-menu', component: WeekMenuContainerComponent},
  {path: 'basket',    component: BasketContainerComponent},
  {path: 'payment',   component: PaymentContainerComponent},
  {path: 'my-orders', component: MyOrdersContainerComponent},
  {path: 'counter',   component: CounterContainerComponent},
  {path: '',          redirectTo: '/week-menu', pathMatch: 'full'},
  {path: '**',        component: CounterContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
