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
const LMdContentComponent = upgradeAdapter.upgradeNg1Component('lMdContent');
const LMdToolbarComponent = upgradeAdapter.upgradeNg1Component('lMdToolbar');
const LMdSidenavComponent = upgradeAdapter.upgradeNg1Component('lMdSidenav');
const LMdListComponent = upgradeAdapter.upgradeNg1Component('lMdList');
const LMdListItemComponent = upgradeAdapter.upgradeNg1Component('lMdListItem');
const LMdIconComponent = upgradeAdapter.upgradeNg1Component('lMdIcon');

import {RandomNumberService} from './random-number.service';

@NgModule({
  declarations: [
    LMdButtonComponent,
    LMdContentComponent,
    LMdToolbarComponent,
    LMdSidenavComponent,
    LMdListComponent,
    LMdListItemComponent,
    LMdIconComponent,

    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ],
  imports: [CommonModule],
  exports: [
    LMdButtonComponent,
    LMdContentComponent,
    LMdToolbarComponent,
    LMdSidenavComponent,
    LMdListComponent,
    LMdListItemComponent,
    LMdIconComponent,

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
