import {Action} from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET = 'SET';

export const increment = (): Action => ({type: INCREMENT});
export const incrementIfOdd = (counter: number): Action => ({type: INCREMENT_IF_ODD, payload: counter});
export const decrement = (): Action => ({type: DECREMENT});
export const reset = (): Action => ({type: RESET});
export const set = (value: number): Action => ({type: SET, payload: value});
