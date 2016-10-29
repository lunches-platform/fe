import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CounterContainerComponent, CounterComponent} from './components';
import {CounterService} from './counter.service';
import {Actions as CounterActions} from './store/counter.actions';

@NgModule({
  declarations: [
    CounterComponent,
    CounterContainerComponent
  ],
  providers: [CounterService, CounterActions],
  imports: [CommonModule],
  exports: [CounterContainerComponent]
})
export class CounterModule {}
