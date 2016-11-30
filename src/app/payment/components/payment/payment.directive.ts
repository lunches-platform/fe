import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-payment'
})
export class PaymentDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lPayment', elementRef, injector);
  }
}
