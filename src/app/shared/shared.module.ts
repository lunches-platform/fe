import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  // angular material 1.x wrapper components
  LMdButtonComponent,
  LMdContentComponent,
  LMdToolbarComponent,
  LMdSidenavComponent,
  LMdIconComponent,

  ListComponent,

  ExampleComponent,
  FlashMessageComponent,
  PastDaysSwitcherComponent,
  MenuCoverComponent
} from './components';


@NgModule({
  imports: [
    CommonModule
  ],
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
