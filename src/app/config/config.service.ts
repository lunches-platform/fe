import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IState as IAppState } from '../app.reducer';
import { IState as IAppConfig } from './config.reducer';

import { loadConfigSuccess, loadConfigError } from './config.actions';

@Injectable()
export class ConfigService {
  constructor(private http: Http, private store: Store<IAppState>) {}

  load(): Promise<void> {
    return this.http.get('/config.json').toPromise()
      .then(res => this.store.dispatch(loadConfigSuccess(res.json())))
      .catch(err => this.store.dispatch(loadConfigError(err)));
  }

  get(): Observable<IAppConfig> {
    return this.store.select<IAppConfig>('config');
  };
}
