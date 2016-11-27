import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CounterContainerComponent} from './components';

const routes: Routes = [
  {path: 'counter', component: CounterContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterRoutingModule {}
