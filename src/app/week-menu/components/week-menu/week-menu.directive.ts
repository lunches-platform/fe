import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  // tslint:disable-next-line
  selector: 'l-week-menu'
})
export class WeekMenuDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lWeekMenu', elementRef, injector);
  }
}
