import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {CounterModule} from './counter';
import {SharedModule} from './shared';
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
    CounterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
