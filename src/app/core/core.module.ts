import {NgModule, Optional, SkipSelf} from '@angular/core';

import {Ng1Module} from '../ng1';

import {RandomNumberService} from './random-number.service';
import {throwIfAlreadyLoaded} from './module-import-guard';

@NgModule({
  imports: [
    Ng1Module
  ],
  providers: [
    RandomNumberService
  ],
  exports: [
    Ng1Module
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
