import {Product} from '../line-item/line-item.service';
import {Moment} from 'moment';

export class Menu {
  constructor(
    public id: number,
    public date: Moment,
    public products: Product[]
  ) {

  }
}
