import { ActionReducer } from '@ngrx/store';
import { handleActions } from 'redux-actions';
import { INCREMENT, INCREMENT_IF_ODD, DECREMENT, RESET, SET } from './counter.actions';

export type IState = number;
export const initialState: IState = 0;

export const reducer: ActionReducer<IState> = handleActions<IState>({
  [INCREMENT]: state => state + 1,
  [INCREMENT_IF_ODD]: (state, action) => action.payload % 2 !== 0 ? state + 1 : state,
  [DECREMENT]: (state) => state - 1,
  [RESET]: () => 0,
  [SET]: (_, action) => action.payload,
}, initialState);
