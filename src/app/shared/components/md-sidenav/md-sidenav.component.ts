import {Directive, Input, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-md-sidenav'
})
export class LMdSidenavComponent extends UpgradeComponent {
  @Input() klass: string;
  @Input() mdComponentId: string;
  @Input() mdIsLockedOpen: boolean;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdSidenav', elementRef, injector);
  }
}
