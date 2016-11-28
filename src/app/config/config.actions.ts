import {createAction} from 'redux-actions';
import {IState as IAppConfig} from './config.reducer';

export const LOAD_CONFIG_SUCCESS = 'LOAD_CONFIG_SUCCESS';
export const loadConfigSuccess = createAction<IAppConfig>(LOAD_CONFIG_SUCCESS, (config: IAppConfig) => config);

export const LOAD_CONFIG_ERROR = 'LOAD_CONFIG_ERROR';
export const loadConfigError = createAction<Error>(LOAD_CONFIG_ERROR, (err: Error) => err);
