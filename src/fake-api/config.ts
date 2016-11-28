// third-party deps
import {IHttpBackendService} from 'angular';

// internal deps
import {twoWeekMenuResponse} from './two-week-menu';
import {ConfigService} from '../app/config';

export function fakeApiConfig($httpBackend: IHttpBackendService, configService: ConfigService) {
  'ngInject';

  let lConfig;
  configService.get().first().subscribe(config => lConfig = config);

  $httpBackend.whenGET(lConfig.apiUrl + '/menus/week/current').respond((method, url, data) => {
    return [200, twoWeekMenuResponse, {}];
  });
}
