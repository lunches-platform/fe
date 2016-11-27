import '@ngrx/core/add/operator/select';
import {Observable} from 'rxjs/Observable';
import {IState} from './user.reducer';
import {IState as IAppState} from '../../app.reducer';

export const getUser = (appState$: Observable<IAppState>): Observable<IState> => {
  return appState$.select<IState>('user');
};
