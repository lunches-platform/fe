import {counterReducer} from '../counter';

export interface IAppState {
  counter: number;
}

export const appReducer = {
  counter: counterReducer
};
