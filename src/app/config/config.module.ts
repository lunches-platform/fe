import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { ConfigService } from './config.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.load(),
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class ConfigModule {
  constructor (@Optional() @SkipSelf() parentModule: ConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'ConfigModule');
  }
}
