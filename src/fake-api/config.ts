import {IHttpBackendService} from 'angular';
import {twoWeekMenuResponse} from './two-week-menu';

export function fakeApiConfig($httpBackend: IHttpBackendService) {
  'ngInject';

  $httpBackend.whenGET('http://api.cogniance.lunches.com.ua/menus/week/current').respond((method, url, data) => {
    return [200, twoWeekMenuResponse, {}];
  });
}
