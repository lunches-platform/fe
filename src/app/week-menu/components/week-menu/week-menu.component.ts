import {Directive, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'l-week-menu'
})
export class WeekMenuComponent extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('lWeekMenu', elementRef, injector);
  }
}
