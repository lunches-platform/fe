import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CounterContainerComponent, CounterComponent} from './components';
import {CounterService} from './counter.service';

@NgModule({
  declarations: [
    CounterComponent,
    CounterContainerComponent
  ],
  providers: [CounterService],
  imports: [CommonModule],
  exports: [CounterContainerComponent]
})
export class CounterModule {}
