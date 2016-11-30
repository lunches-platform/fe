import { ActionReducer, Action } from '@ngrx/store';
import { handleActions } from 'redux-actions';
import { LOAD_CONFIG_SUCCESS } from './config.actions';

export interface IState {
  apiUrl: string;
  address: IAddress;
}

export interface IAddress {
  details: string[];
  options: {
    floorSelector: boolean;
  };
}

export const initialState: IState = {
  address: {
    details: ['Example LLC', 'Sample str', '7', '1'],
    options: {
      floorSelector: true
    }
  },
  apiUrl: 'http://api.example.com'
};

export const reducer: ActionReducer<IState> = handleActions<IState>({
  [LOAD_CONFIG_SUCCESS]: (_: IState, action: Action) => action.payload
}, initialState);
