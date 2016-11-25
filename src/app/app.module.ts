import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {SharedModule} from './shared';
import {UserModule} from './user';
import {CounterModule} from './counter';

import {reducer} from './store';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    SharedModule.forRoot(),
    UserModule,
    CounterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
