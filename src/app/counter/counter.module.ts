import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CounterRoutingModule } from './counter-routing.module';

import {
  CounterContainerComponent,
  CounterComponent
} from './components';

@NgModule({
  declarations: [
    CounterComponent,
    CounterContainerComponent
  ],
  imports: [CommonModule, CounterRoutingModule],
  exports: [CounterContainerComponent]
})
export class CounterModule {}
