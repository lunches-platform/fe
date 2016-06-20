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

  calcPriceForAllProductsIn(menu: DayMenu) {
    return this.calcPriceFor(menu.products);
  }

  calcPriceFor(products: Product[]) {
    return products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);
  }
}

