// import {assign} from '../assign';
import {Product} from '../product/product.service';

export class Menu {
  id: number;
  date: string;
  products: Product[];
}

export class MenuService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

}

