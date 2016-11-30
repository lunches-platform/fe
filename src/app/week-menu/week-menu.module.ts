import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { WeekMenuRoutingModule } from './week-menu-routing.module';

import {
  WeekMenuDirective,
  WeekMenuContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    WeekMenuRoutingModule
  ],
  declarations: [
    WeekMenuDirective,
    WeekMenuContainerComponent
  ],
  exports: [
    WeekMenuContainerComponent
  ]
})
export class WeekMenuModule {
}
