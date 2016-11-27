import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {upgradeAdapter} from '../upgrade-adapter';

import {WeekMenuRoutingModule} from './week-menu-routing.module';

import {
  WeekMenuContainerComponent
} from './components';

const WeekMenuComponent = upgradeAdapter.upgradeNg1Component('lWeekMenu');

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
