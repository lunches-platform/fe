import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-card'
})
export class LMdCardDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdCard', elementRef, injector);
  }
}
