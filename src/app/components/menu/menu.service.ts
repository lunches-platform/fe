import {Product} from '../line-item/line-item.service';
import {Moment} from 'moment';

export class Menu {
  id: number;
  date: Moment;
  products: Product[];
}
