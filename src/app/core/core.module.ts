import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RouterStoreModule } from '@ngrx/router-store';

import { ConfigModule } from '../config';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { RandomNumberService } from './random-number.service';
import { RouterWrapper } from './router-wrapper';

@NgModule({
  imports: [
    HttpModule,
    ConfigModule,
    RouterStoreModule.connectRouter()
  ],
  providers: [
    RandomNumberService,
    RouterWrapper
  ],
  exports: [
    HttpModule,
    ConfigModule
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
