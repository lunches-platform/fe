import {NgModule, ModuleWithProviders} from '@angular/core';

import {RandomNumberService} from './random-number.service';

@NgModule()
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RandomNumberService]
    };
  }
}
