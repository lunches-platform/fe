import {ActionReducer, Action} from '@ngrx/store';

import {Actions} from './counter.actions';

export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      return state + 1;

    case Actions.INCREMENT_IF_ODD:
      return action.payload % 2 !== 0 ? state + 1 : state;

    case Actions.DECREMENT:
      return state - 1;

    case Actions.RESET:
      return 0;

    case Actions.SET:
      return action.payload;

    default:
      return state;
  }
};
