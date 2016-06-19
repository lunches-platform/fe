// import {assign} from '../assign';
import {Product} from '../product/product.service';
import {DayMenu} from '../day-menu/day-menu.service';

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

  // fetchAll(): ng.IPromise<DayMenu[]> {
  fetchAll() {
    const url = 'http://dinners/api/menus';
    return this.$http.get(url)
        .then((res: IRes) => {

            console.log(res);
          return res.data.map(menu => {
            const m = new DayMenu();
            m.id = menu.id;
            m.date = menu.date;
            m.products = menu.products.map((product: Product) => {

                const p = new Product();
                p.id = product.id;
                p.name = product.name;
                p.price = product.price;
                // p.weight = product.weight;
                p.ingredients = product.ingredients;
                return p;
            });
            return m;
          });
        })
        ;
  }
}

