import {Component} from '@angular/core';

import {Actions} from '../../store';
import {CounterService} from '../../counter.service';

@Component({
  selector: 'l-counter-container',
  template: `
    <l-counter
      [value$]="counterService.get()"
      (increment)="actions.increment()"
      (incrementIfOdd)="actions.incrementIfOdd()"
      (incrementAsync)="actions.incrementAsync($event)"
      (decrement)="actions.decrement()"
      (random)="actions.random()"
      (reset)="actions.reset()">
    </l-counter>
  `
})
export class CounterContainerComponent {
  constructor(
    // map state to inputs
    public counterService: CounterService,

    // map actions to outputs
    public actions: Actions
  ) {}
}
