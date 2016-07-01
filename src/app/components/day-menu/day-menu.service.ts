// import {assign} from '../assign';
import {Product} from '../product/product.service';

export class DayMenu {
  id: number;
  date: string;
  products: Product[];
}

export class DayMenuService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

}

