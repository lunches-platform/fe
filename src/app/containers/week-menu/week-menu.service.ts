import {Product} from '../../components/product/product.service';
import {Menu} from '../../components/menu/menu.service';
import * as moment from 'moment';

export interface IRes {
  data: any[];
  status: number;
  statusText: string;
  config: any;
}
export class WeekMenuService {
  constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
    'ngInject';
  }

  // // fetchAll(): ng.IPromise<Menu[]> {
  // fetchAll() {
  //   const url = 'http://dinners/api/menus';
  //   return this.$http.get(url)
  //       .then((res: IRes) => {

  //           console.log(res);
  //         return res.data.map(menu => {
  //           const m = new Menu();
  //           m.id = menu.id;
  //           m.date = menu.date;
  //           m.products = menu.products.map((product: Product) => {

  //               const p = new Product();
  //               p.id = product.id;
  //               p.name = product.name;
  //               p.price = product.price;
  //               // p.weight = product.weight;
  //               p.ingredients = product.ingredients;
  //               return p;
  //           });
  //           return m;
  //         });
  //       })
  //       ;
  // }

  fetchAll(): ng.IPromise<Menu[]> {
    const productsFixture = [
      {
        id: 1,
        name: 'Куриная котлета',
        ingredients: ['Курица', 'Яйцо'],
        pricePer100: 12,
        sizeToWeight: {
          small: 90,
          mid: 150,
          big: 200
        }
      },
      {
        id: 2,
        name: 'Гречка с грибами',
        ingredients: ['Гречка', 'грибы'],
        pricePer100: 9,
        sizeToWeight: {
          small: 120,
          mid: 200,
          big: 300
        }
      }
    ];

    const products: Product[] = productsFixture.map(product => {
      const p = new Product();
      p.id = product.id;
      p.name = product.name;
      p.ingredients = product.ingredients;
      p.sizeToWeight = product.sizeToWeight;
      p.pricePer100 = product.pricePer100;
      return p;
    });

    return this.$q.resolve([
      {
        id: 1,
        date: moment.utc('2016-02-15'),
        products: products
      },
      {
        id: 2,
        date: moment.utc('2016-02-16'),
        products: products
      },
      {
        id: 3,
        date: moment.utc('2016-02-17'),
        products: products
      },
      {
        id: 4,
        date: moment.utc('2016-02-18'),
        products: products
      },
      {
        id: 5,
        date: moment.utc('2016-02-19'),
        products: products
      }
    ]);
  }
}

