import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {upgradeAdapter} from '../upgrade-adapter';

import {
  ExampleComponent,
  FlashMessageComponent,
  PastDaysSwitcherComponent,
  MenuCoverComponent
} from './components';

// angular material 1.x wrapper components
const LMdButtonComponent = upgradeAdapter.upgradeNg1Component('lMdButton');

import {RandomNumberService} from './random-number.service';

@NgModule({
  declarations: [
    LMdButtonComponent,

    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ],
  imports: [CommonModule],
  exports: [
    LMdButtonComponent,

    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RandomNumberService]
    };
  }
}
