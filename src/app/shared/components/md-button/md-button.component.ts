import {Directive, Input, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-md-button'
})
export class LMdButtonComponent extends UpgradeComponent {
  @Input() klass: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdButton', elementRef, injector);
  }
}
