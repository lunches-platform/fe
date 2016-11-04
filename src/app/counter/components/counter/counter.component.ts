import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'l-counter',
  template: `
    <p>
      Clicked: <span>{{ value | async }}</span> times
      <button (click)="increment.emit()">+</button>
      <button (click)="decrement.emit()">-</button>
      <button (click)="incrementIfOdd.emit()">Increment if odd</button>
      <button (click)="incrementAsync.emit(1000)">Increment async</button>
      <button (click)="random.emit()">Set to random number</button>
      <button (click)="reset.emit()">Reset Counter</button>
    </p>
  `
})
export class CounterComponent {
  @Input('value$') value: Observable<number>;
  @Output() increment = new EventEmitter<void>();
  @Output() incrementIfOdd = new EventEmitter<void>();
  @Output() incrementAsync = new EventEmitter<number>();
  @Output() decrement = new EventEmitter<void>();
  @Output() random = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
}
