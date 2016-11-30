import { Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-icon'
})
export class LMdIconDirective extends UpgradeComponent {
  @Input() ariaLabel: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdIcon', elementRef, injector);
  }
}
