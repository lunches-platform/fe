import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {increment, incrementIfOdd, decrement, reset, set} from '../../store';
import {IAppState} from '../../../store';

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

  constructor(private store: Store<IAppState>, private randomNumberService: RandomNumberService) {
    this.counter$ = store.select<number>('counter');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  incrementIfOdd(): void {
    this.store.dispatch(incrementIfOdd(this.getCurrentCounter()));
  }

  incrementAsync(delay: number = 1000): void {
    setTimeout(() => this.store.dispatch(increment()), delay);
  }

  random(): void {
    this.store.dispatch(set(this.randomNumberService.pick()));
  }

  private getCurrentCounter(): number {
    let currentCounter: number;

    // sync way!
    this.counter$.subscribe(s => currentCounter = s);

    return currentCounter;
  }
}
