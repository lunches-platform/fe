import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {BasketRoutingModule} from './basket-routing.module';

import {
  BasketComponent,
  BasketContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    BasketRoutingModule
  ],
  declarations: [
    BasketComponent,
    BasketContainerComponent
  ],
  exports: [
    BasketContainerComponent
  ]
})
export class BasketModule {
}
