import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {FlashMessageComponent} from './components';

import {RandomNumberService} from './random-number.service';

@NgModule({
  declarations: [
    FlashMessageComponent
  ],
  imports: [CommonModule],
  exports: [FlashMessageComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RandomNumberService]
    };
  }
}
