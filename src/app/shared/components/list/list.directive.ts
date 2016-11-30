import { Directive, Input, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

export interface IListItem {
  title: string;
  icon: string;
  ariaLabel: string;
  state: string;
}

@Directive({
  // tslint:disable-next-line
  selector: 'l-list'
})
export class ListDirective extends UpgradeComponent {
  @Input() containerClass: string;
  @Input() itemClass: string;
  @Input() items: IListItem[];

  constructor(elementRef: ElementRef, injector: Injector) {
    super('lList', elementRef, injector);
  }
}
