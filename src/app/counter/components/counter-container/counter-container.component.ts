import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {IState as IAppState} from '../../../store';

import {increment, decrement, reset, incrementIfOdd, set, getCounterState} from '../../store';
import {RandomNumberService} from '../../../shared';

@Component({
  selector: 'l-counter-container',
  template: `
    <l-counter
      [value$]="counter$"
      (increment)="increment()"
      (incrementIfOdd)="incrementIfOdd()"
      (incrementAsync)="incrementAsync($event)"
      (decrement)="decrement()"
      (random)="random()"
      (reset)="reset()">
    </l-counter>
  `
})
export class CounterContainerComponent {

  counter$: Observable<number>;

  constructor(
    private store: Store<IAppState>,
    private randomNumberService: RandomNumberService
  ) {
    this.counter$ = getCounterState(this.store);
  }

  increment(): void {
    this.store.dispatch(increment());
  };

  decrement(): void {
    this.store.dispatch(decrement());
  };

  reset(): void {
    this.store.dispatch(reset());
  }

  incrementIfOdd(): void {
    this.store.dispatch(
      incrementIfOdd(this.getCurrentValueFrom(this.counter$))
    );
  }

  random(): void {
    this.store.dispatch(
      set(this.randomNumberService.pick())
    );
  }

  incrementAsync(delay: number = 1000): void {
    setTimeout(() => this.increment(), delay);
  }

  getCurrentValueFrom(counter$: Observable<number>): number {
    let value: number;

    // sync way!
    counter$.subscribe(counter => value = counter);

    return value;
  }
}
