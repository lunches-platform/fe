import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';

import {storeFreeze} from 'ngrx-store-freeze';
import {storeLogger} from 'ngrx-store-logger';

import {IState as ICounterState, reducer as counterReducer} from '../counter';

// application state interface
export interface IState {
  counter: ICounterState;
}

// app level reducers
export const reducers = {
  counter: counterReducer
};

// root reducer
export const reducer: ActionReducer<IState> = compose(
  storeLogger({diff: true}),
  storeFreeze,
  combineReducers
)(reducers);
