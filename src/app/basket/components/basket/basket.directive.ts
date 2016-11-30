import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-basket'
})
export class BasketDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lBasket', elementRef, injector);
  }
}
