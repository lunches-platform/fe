import {ProductsService, Product} from '../products/products';

class ProductsController {
  products: any[];

  /** @ngInject */
  constructor(public productsService: ProductsService) {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productsService.fetchAll()
      .then((products: Product[]) => {
        console.log('products', products);
        this.products = products;
      });
  }
}

export const Products = {
  templateUrl: 'app/components/Products.html',
  controller: ProductsController,
  controllerAs: 'vm'
};
