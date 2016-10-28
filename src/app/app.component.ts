import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {increment, incrementIfOdd, decrement, reset, set} from './actions';
import {RandomNumberService} from './random-number.service';

interface AppState {
  counter: number;
}

@Component({
  selector: 'l-app',
  template: `
    <p>
      Clicked: {{ counter$ | async }} times
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="incrementIfOdd()">Increment if odd</button>
      <button (click)="incrementAsync(2222)">Increment async</button>
      <button (click)="random()">Set to random number</button>
      <button (click)="reset()">Reset Counter</button>
    </p>
  `
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>, private randomNumberService: RandomNumberService) {
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
