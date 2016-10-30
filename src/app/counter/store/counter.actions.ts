import {createAction} from 'redux-actions';

export const INCREMENT = 'INCREMENT';
export const increment = createAction<void>(INCREMENT, () => null);

export const DECREMENT = 'DECREMENT';
export const decrement = createAction<void>(DECREMENT, () => null);

export const RESET = 'RESET';
export const reset = createAction<void>(RESET, () => null);

export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const incrementIfOdd = createAction<number>(INCREMENT_IF_ODD, (currentCounter: number) => currentCounter);

export const SET = 'SET';
export const set = createAction<number>(SET, (value: number) => value);
