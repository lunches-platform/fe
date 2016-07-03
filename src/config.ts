/// <reference path="../typings/index.d.ts" />

import 'moment/locale/ru';
import * as moment from 'moment';

export default localeConfig;

function localeConfig() {
  'ngInject';

  moment.locale('ru');
}
