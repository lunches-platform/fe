import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeekMenuContainerComponent } from './components';

const routes: Routes = [
  {path: 'week-menu', component: WeekMenuContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeekMenuRoutingModule {}
