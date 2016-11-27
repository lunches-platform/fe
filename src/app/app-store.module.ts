import {NgModule, Optional, SkipSelf} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {throwIfAlreadyLoaded} from './core/module-import-guard';
import {reducer as appReducer} from './app.reducer';

@NgModule({
  imports: [
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]
})
export class AppStoreModule {
  constructor (@Optional() @SkipSelf() parentModule: AppStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
  }
}
