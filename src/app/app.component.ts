import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from './counter';

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
      <button (click)="reset()">Reset Counter</button>
    </p>
  `
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>){
    this.counter$ = store.select<number>('counter');
  }

  increment() {
    this.store.dispatch({type: INCREMENT});
  }

  decrement() {
    this.store.dispatch({type: DECREMENT});
  }

  reset() {
    this.store.dispatch({type: RESET});
  }

  incrementIfOdd(): void {
    if (this.getCurrentCounter() % 2 !== 0) {
      this.increment();
    }
  }

  incrementAsync(delay: number = 1000): void {
    setTimeout(() => this.increment(), delay);
  }

  getCurrentCounter(): number {
    let currentCounter: number;

    // todo: will it add new handler each time and eat memory?
    this.counter$.subscribe(s => currentCounter = s);

    return currentCounter;
  }
}