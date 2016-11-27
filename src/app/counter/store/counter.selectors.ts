import '@ngrx/core/add/operator/select';
import {Observable} from 'rxjs/Observable';
import {IState} from './counter.reducer';
import {IState as IAppState} from '../../app.reducer';

export const getCounterState = (state$: Observable<IAppState>): Observable<IState> => {
  return state$.select<IState>('counter');
};
