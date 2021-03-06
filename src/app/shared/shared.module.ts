import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  // angular material 1.x wrapper components
  LMdButtonDirective,
  LMdContentDirective,
  LMdToolbarDirective,
  LMdSidenavDirective,
  LMdIconDirective,
  LMdProgressLinearDirective,
  LMdCardDirective,

  ListDirective,

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
    LMdButtonDirective,
    LMdContentDirective,
    LMdToolbarDirective,
    LMdSidenavDirective,
    LMdIconDirective,
    LMdProgressLinearDirective,
    LMdCardDirective,

    // ng1 components
    ListDirective,

    // ng2 components
    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ],
  exports: [
    CommonModule,
    // ng1 md-* wrappers
    LMdButtonDirective,
    LMdContentDirective,
    LMdToolbarDirective,
    LMdSidenavDirective,
    LMdIconDirective,
    LMdProgressLinearDirective,
    LMdCardDirective,

    // ng1 components
    ListDirective,

    // ng2 components
    ExampleComponent,
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ],
  entryComponents: [
    FlashMessageComponent,
    PastDaysSwitcherComponent,
    MenuCoverComponent
  ]
})
export class SharedModule {}
