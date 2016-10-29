import {NgModule} from '@angular/core';

import {RandomNumberService} from './random-number.service';

@NgModule({
  providers: [
    RandomNumberService
  ],
})
export class SharedModule {}
