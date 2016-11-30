import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { BasketRoutingModule } from './basket-routing.module';

import {
  BasketDirective,
  BasketContainerComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    BasketRoutingModule
  ],
  declarations: [
    BasketDirective,
    BasketContainerComponent
  ],
  exports: [
    BasketContainerComponent
  ]
})
export class BasketModule {
}
