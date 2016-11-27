import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {upgradeAdapter} from '../upgrade-adapter';

import {
  WeekMenuContainerComponent
} from './components';

const WeekMenuComponent = upgradeAdapter.upgradeNg1Component('lWeekMenu');

@NgModule({
  declarations: [
    WeekMenuComponent,
    WeekMenuContainerComponent
  ],
  imports: [CommonModule],
  exports: [
    WeekMenuContainerComponent
  ]
})
export class WeekMenuModule {
}
