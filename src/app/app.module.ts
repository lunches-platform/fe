import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';

import {counterReducer} from './counter';
import {AppComponent} from './app.component';
import {RandomNumberService} from './random-number.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    RandomNumberService
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({counter: counterReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
