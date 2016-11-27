import {Directive, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-payment'
})
export class PaymentComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lPayment', elementRef, injector);
  }
}
