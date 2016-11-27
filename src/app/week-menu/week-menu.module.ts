import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {WeekMenuRoutingModule} from './week-menu-routing.module';

import {
  WeekMenuComponent,
  WeekMenuContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    WeekMenuRoutingModule
  ],
  declarations: [
    WeekMenuComponent,
    WeekMenuContainerComponent
  ],
  exports: [
    WeekMenuContainerComponent
  ]
})
export class WeekMenuModule {
}
