import {IHttpBackendService} from 'angular';
import {twoWeekMenuResponse} from './two-week-menu';

// todo: add type for lConfig
export function fakeApiConfig($httpBackend: IHttpBackendService, lConfig) {
  'ngInject';

  $httpBackend.whenGET(lConfig.apiUrl + '/menus/week/current').respond((method, url, data) => {
    return [200, twoWeekMenuResponse, {}];
  });
}
