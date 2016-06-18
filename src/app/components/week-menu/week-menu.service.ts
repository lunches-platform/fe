// import {assign} from '../assign';
import {Product} from '../product/product.service';
import {DayMenu} from '../day-menu/day-menu.service';

export class WeekMenuService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }

  fetchAll(): ng.IPromise<DayMenu[]> {
    const productsFixture = [
      {
        id: 1,
        name: 'Куриная котлета',
        ingredients: ['Курица', 'Яйцо'],
        weight: 200
      },
      {
        id: 2,
        name: 'Гречка с грибами',
        ingredients: ['Гречка', 'грибы'],
        weight: 300
      }
    ];

    const products: Product[] = productsFixture.map(product => {
      const p = new Product();
      p.id = product.id;
      p.name = product.name;
      p.weight = product.weight;
      p.ingredients = product.ingredients;
      return p;
    });

    return this.$q.resolve([
      {
        id: 1,
        date: '2016-02-14',
        products: products
      },
      {
        id: 2,
        date: '2016-02-15',
        products: products
      },
      {
        id: 3,
        date: '2016-02-16',
        products: products
      },
      {
        id: 4,
        date: '2016-02-17',
        products: products
      },
      {
        id: 5,
        date: '2016-02-18',
        products: products
      }
    ]);
  }
}

