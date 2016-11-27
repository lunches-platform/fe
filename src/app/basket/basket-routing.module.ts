import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BasketContainerComponent} from './components';

const routes: Routes = [
  {path: 'basket', component: BasketContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule {}
