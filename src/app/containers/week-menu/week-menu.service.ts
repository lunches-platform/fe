import {Product} from '../../components/line-item/line-item.service';
import {Menu} from '../../components/menu/menu.service';
import * as moment from 'moment';
import {IQService, IHttpService, IPromise} from 'angular';

export interface IRes<T> {
  data: T[];
  status: number;
  statusText: string;
  config: any;
}

export class WeekMenuService {
  constructor(private $q: IQService, private $http: IHttpService) {
    'ngInject';
  }

  fetchAll() {
  // fetchAll(): IPromise<Menu[]> {
    const url = 'http://api.lunches.com.ua/menus/week/current';
    return this.$http.get(url)
      .then((res: IRes<Menu>) => {
        return res.data.map(menu => {
          return new Menu(menu.id, moment.utc(menu.date), this.createProductsListFrom(menu.products));
        });
      });
  }

  private createProductsListFrom(products: any[]): Product[] {
    return products.map(product => {
      return new Product(product.id, product.name, product.price, product.ingredients, product.sizeToWeight);
    });
  }

  // fetchAll(): IPromise<Menu[]> {
  //   const productsFixture = [
  //     {
  //       id: 1,
  //       name: 'Куриная котлета',
  //       ingredients: ['Курица', 'Яйцо'],
  //       price: 12,
  //       sizeToWeight: {
  //         small: 90,
  //         medium: 150,
  //         big: 200
  //       },

  //     },
  //     {
  //       id: 2,
  //       name: 'Гречка с грибами',
  //       ingredients: ['Гречка', 'грибы'],
  //       price: 9,
  //       sizeToWeight: {
  //         small: 120,
  //         medium: 200,
  //         big: 300
  //       }
  //     }
  //   ];

  //   const products: Product[] = productsFixture.map(product => {
  //     const p = new Product();
  //     p.id = product.id;
  //     p.name = product.name;
  //     p.ingredients = product.ingredients;
  //     p.sizeToWeight = product.sizeToWeight;
  //     p.price = product.price;
  //     return p;
  //   });

  //   return this.$q.resolve([
  //     {
  //       id: 1,
  //       date: moment.utc('2016-02-15'),
  //       products: products
  //     },
  //     {
  //       id: 2,
  //       date: moment.utc('2016-02-16'),
  //       products: products
  //     },
  //     {
  //       id: 3,
  //       date: moment.utc('2016-02-17'),
  //       products: products
  //     },
  //     {
  //       id: 4,
  //       date: moment.utc('2016-02-18'),
  //       products: products
  //     },
  //     {
  //       id: 5,
  //       date: moment.utc('2016-02-19'),
  //       products: products
  //     }
  //   ]);
  // }
}

