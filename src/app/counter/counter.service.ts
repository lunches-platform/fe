import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../store';

@Injectable()
export class CounterService {
  constructor(private store: Store<IAppState>) {}

  get() {
    return this.store.select<number>('counter');
  }
}
