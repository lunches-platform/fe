import * as moment from 'moment';
import {capitalize} from 'lodash';

export function DateFilter() {
  return (date: string) => {
    return capitalize(moment(date).format('dddd, MMMM Do'));
  };
}
