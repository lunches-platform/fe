import { ActionReducer } from '@ngrx/store';
import { handleActions } from 'redux-actions';

export interface IUser {
  id: string;
  fullname: string;
  balance: number;
  credit: number;
  clientId: number;
  address: string;
  created: string;
}

export type IState = IUser;

export const initialState: IState = {
  id: null,
  fullname: '',
  address: '',
  clientId: 0,
  balance: 0,
  credit: 0,
  created: null
};

export const reducer: ActionReducer<IState> = handleActions<IState>({}, initialState);
