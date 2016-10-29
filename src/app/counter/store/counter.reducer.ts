import {ActionReducer, Action} from '@ngrx/store';

import {INCREMENT, INCREMENT_IF_ODD, DECREMENT, RESET, SET} from './counter.actions';


export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case INCREMENT_IF_ODD:
      return action.payload % 2 !== 0 ? state + 1 : state;

    case DECREMENT:
      return state - 1;

    case RESET:
      return 0;

    case SET:
      return action.payload;

    default:
      return state;
  }
};
