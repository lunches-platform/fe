import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

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
const LMdIconComponent = upgradeAdapter.upgradeNg1Component('lMdIcon');

const ListComponent = upgradeAdapter.upgradeNg1Component('lList');

@NgModule({
  declarations: [
    // ng1 md-* wrappers
    LMdButtonComponent,
    LMdContentComponent,
    LMdToolbarComponent,
    LMdSidenavComponent,
    LMdIconComponent,

    // ng1 components
    ListComponent,

    // ng2 components
    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    // ng1 md-* wrappers
    LMdButtonComponent,
    LMdContentComponent,
    LMdToolbarComponent,
    LMdSidenavComponent,
    LMdIconComponent,

    // ng1 components
    ListComponent,

    // ng2 components
    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ]
})
export class SharedModule {}
