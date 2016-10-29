import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CounterComponent} from './components';

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [CommonModule],
  exports: [CounterComponent]
})
export class CounterModule {}
