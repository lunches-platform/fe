import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import {CounterModule} from './counter';
import {SharedModule} from './shared';
import {appReducer} from './store';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(appReducer),
    SharedModule.forRoot(),
    CounterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
