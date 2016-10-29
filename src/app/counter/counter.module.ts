import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CounterContainerComponent, CounterComponent} from './components';

@NgModule({
  declarations: [
    CounterComponent,
    CounterContainerComponent
  ],
  imports: [CommonModule],
  exports: [CounterContainerComponent]
})
export class CounterModule {}
