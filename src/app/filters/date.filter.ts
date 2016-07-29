import * as moment from 'moment';

export function DateFilter() {
  return (date: string) => {
    return moment(date).format('dddd, MMMM Do');
  };
}
