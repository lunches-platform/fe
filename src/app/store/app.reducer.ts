import {keys} from 'lodash';
import '@ngrx/core/add/operator/select';

import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';

import {storeFreeze} from 'ngrx-store-freeze';
import {storeLogger} from 'ngrx-store-logger';
import {localStorageSync} from 'ngrx-store-localstorage';

import {IState as ICounterState, reducer as counterReducer} from '../counter';
import {IState as IUserState, reducer as userReducer} from '../user';

// application state interface
export interface IState {
  counter: ICounterState;
  user: IUserState;
}

// app level reducers
export const reducers = {
  counter: counterReducer,
  user: userReducer
};

// root reducer
export const reducer: ActionReducer<IState> = compose(
  storeLogger(),
  storeFreeze,
  localStorageSync(keys(reducers), true),
  combineReducers
)(reducers);
