import {Moment} from 'moment';

export function DateFilter() {
  return (date: Moment) => {
    return date.format('dddd, MMMM Do');
  };
}
