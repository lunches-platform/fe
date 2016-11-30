import { Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-md-toolbar'
})
export class LMdToolbarDirective extends UpgradeComponent {
  @Input() klass: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdToolbar', elementRef, injector);
  }
}
