import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-my-orders'
})
export class MyOrdersDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMyOrders', elementRef, injector);
  }
}
