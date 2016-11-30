import { Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-sidenav'
})
export class LMdSidenavDirective extends UpgradeComponent {
  @Input() klass: string;
  @Input() mdComponentId: string;
  @Input() mdIsLockedOpen: boolean;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdSidenav', elementRef, injector);
  }
}
