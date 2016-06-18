import {ProductService, Product} from '../product/product.service';

class DayMenuController {
  products: any[];

  /** @ngInject */
  constructor(public productService: ProductService) {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productService.fetchAll()
      .then((products: Product[]) => {
        console.log('products', products);
        this.products = products;
      });
  }
}

export const DayMenuComponent = {
  templateUrl: 'app/components/day-menu/day-menu.html',
  controller: DayMenuController,
  controllerAs: 'vm'
};
