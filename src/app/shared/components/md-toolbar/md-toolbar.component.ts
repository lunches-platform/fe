import {Directive, Input, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-md-toolbar'
})
export class LMdToolbarComponent extends UpgradeComponent {
  @Input() klass: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdToolbar', elementRef, injector);
  }
}
