// angular 2 platform
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';

// app modules
import {CoreModule} from './core';
import {UserModule} from './user';
import {WeekMenuModule} from './week-menu';
import {BasketModule} from './basket';
import {PaymentModule} from './payment';
import {MyOrdersModule} from './my-orders';
import {CounterModule} from './counter';

// app wide config stuff
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppStoreModule} from './app-store.module';

@NgModule({
  imports: [
    // support modules
    BrowserModule,
    UpgradeModule,
    AppStoreModule,
    AppRoutingModule,
    CoreModule,

    // feature modules
    UserModule,
    WeekMenuModule,
    BasketModule,
    PaymentModule,
    MyOrdersModule,
    CounterModule
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AppComponent
  ]
  // todo: uncomment when fully migrated to ng2
  // bootstrap: [AppComponent]
})
export class AppModule {
  ngDoBootstrap() {}
}
