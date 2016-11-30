import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'l-past-days-switcher',
  template: `
    <div class="layout-column layout-align-center-center">
      <l-md-button klass="md-raise" (click)="switch.emit(!switched)">
        {{ switched ? 'Показать прошедшие дни' : 'Спрятать прошедшие дни' }}
      </l-md-button>
    </div>
  `
})
export class PastDaysSwitcherComponent {
  @Input() switched = false;
  @Output() switch = new EventEmitter<boolean>();
}
