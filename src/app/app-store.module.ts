import {NgModule, Optional, SkipSelf} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducer as appReducer} from './app.reducer';

@NgModule({
  imports: [
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]
})
export class AppStoreModule {
  constructor (@Optional() @SkipSelf() parentModule: AppStoreModule) {
    if (parentModule) {
      throw new Error(
        'AppStoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
