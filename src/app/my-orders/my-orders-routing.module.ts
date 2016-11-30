import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersContainerComponent } from './components';

const routes: Routes = [
  {path: 'my-orders', component: MyOrdersContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule {}
