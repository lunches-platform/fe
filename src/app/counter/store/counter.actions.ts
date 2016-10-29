import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {IAppState} from '../../store';
import {RandomNumberService} from '../../shared';
import {CounterService} from '../counter.service';

@Injectable()
export class Actions {
  static INCREMENT = 'INCREMENT';
  static DECREMENT = 'DECREMENT';
  static RESET = 'RESET';
  static INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
  static SET = 'SET';
  static RANDOM = 'RANDOM';

  private counter$: Observable<number>;

  constructor(
    private store: Store<IAppState>,
    private randomNumberService: RandomNumberService,
    private counterService: CounterService
  ) {
    this.counter$ = counterService.get();
  }

  increment(): void {
    this.store.dispatch({type: Actions.INCREMENT});
  };

  decrement(): void {
    this.store.dispatch({type: Actions.DECREMENT});
  };

  reset(): void {
    this.store.dispatch({type: Actions.RESET});
  }

  incrementIfOdd(): void {
    this.store.dispatch({type: Actions.INCREMENT_IF_ODD, payload: this.getCurrentCounter()});
  }

  set(value: number): void {
    this.store.dispatch({type: Actions.SET, payload: value});
  }

  random(): void {
    this.store.dispatch({type: Actions.SET, payload: this.randomNumberService.pick()});
  }

  incrementAsync(delay: number = 1000): void {
    setTimeout(() => this.increment(), delay);
  }

  private getCurrentCounter(): number {
    let currentCounter: number;

    // sync way!
    this.counter$.subscribe(s => currentCounter = s);

    return currentCounter;
  }
}

