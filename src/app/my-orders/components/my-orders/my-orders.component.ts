import {Directive, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-my-orders'
})
export class MyOrdersComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lMyOrders', elementRef, injector);
  }
}
