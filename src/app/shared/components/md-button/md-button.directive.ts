import { Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-button'
})
export class LMdButtonDirective extends UpgradeComponent {
  @Input() klass: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdButton', elementRef, injector);
  }
}
