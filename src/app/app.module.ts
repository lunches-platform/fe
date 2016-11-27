// angular 2 platform
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// ngrx platform
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// app modules
import {SharedModule} from './shared';
import {UserModule} from './user';
import {WeekMenuModule} from './week-menu';
import {BasketModule} from './basket';
import {PaymentModule} from './payment';
import {MyOrdersModule} from './my-orders';
import {CounterModule} from './counter';
import {Ng1Module} from './ng1';

// app wide config stuff
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {reducer} from './store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // support modules
    BrowserModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    AppRoutingModule,
    SharedModule.forRoot(),
    Ng1Module,

    // feature modules
    UserModule,
    WeekMenuModule,
    BasketModule,
    PaymentModule,
    MyOrdersModule,
    CounterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
