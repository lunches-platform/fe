import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';

import {RouterStoreModule} from '@ngrx/router-store';

import {Ng1Module} from '../ng1';
import {ConfigModule} from '../config';

import {throwIfAlreadyLoaded} from './module-import-guard';

import {RandomNumberService} from './random-number.service';

@NgModule({
  imports: [
    HttpModule,
    ConfigModule,
    RouterStoreModule.connectRouter(),
    Ng1Module
  ],
  providers: [
    RandomNumberService
  ],
  exports: [
    HttpModule,
    ConfigModule,
    Ng1Module
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
