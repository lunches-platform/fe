import {IQService} from 'angular';
import {Product} from '../product/product.service';
import {Moment} from 'moment';

export class Menu {
  id: number;
  date: Moment;
  products: Product[];
}

export class MenuService {
  constructor(private $q: IQService) {
    'ngInject';
  }

}

