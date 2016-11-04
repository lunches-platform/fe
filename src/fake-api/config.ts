// third-party deps
import {IHttpBackendService} from 'angular';

// internal deps
import {twoWeekMenuResponse} from './two-week-menu';
import {IAppConfig} from '../config';

export function fakeApiConfig($httpBackend: IHttpBackendService, lConfig: IAppConfig) {
  'ngInject';

  $httpBackend.whenGET(lConfig.apiUrl + '/menus/week/current').respond((method, url, data) => {
    return [200, twoWeekMenuResponse, {}];
  });
}
