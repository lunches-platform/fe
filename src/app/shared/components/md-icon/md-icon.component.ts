import {Directive, Input, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-md-icon'
})
export class LMdIconComponent extends UpgradeComponent {
  @Input() ariaLabel: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdIcon', elementRef, injector);
  }
}
