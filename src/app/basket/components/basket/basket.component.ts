import {Directive, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-basket'
})
export class BasketComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lBasket', elementRef, injector);
  }
}
