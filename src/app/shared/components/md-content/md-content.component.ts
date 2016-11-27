import {Directive, Input, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-md-content'
})
export class LMdContentComponent extends UpgradeComponent {
  @Input() klass: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMdContent', elementRef, injector);
  }
}
