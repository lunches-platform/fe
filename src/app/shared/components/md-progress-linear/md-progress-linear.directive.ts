import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-progress-linear'
})
export class LMdProgressLinearDirective extends UpgradeComponent {
  @Input() mdMode: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdProgressLinear', elementRef, injector);
  }
}
