import {Product} from '../product/product.service';
import {DayMenu, DayMenuService} from './day-menu.service';
import {OrderItem, OrderService} from '../../models/order.service';
import {Basket, BasketService} from '../../models/basket.service';
import {cloneDeep} from 'lodash';

class DayMenuController {
  menu: DayMenu;
  basket: Basket;
  orderItem: OrderItem;
  onBasketChanged: Function;

  constructor(
    private lDayMenuService: DayMenuService,
    private lOrderService: OrderService,
    private lBasketService: BasketService
  ) {
    'ngInject';

    this.initBasket();

    this.initOrderItem();
  }

  calcPrice() {
    return this.lOrderService.calcPriceForAllProductsIn(this.orderItem);
  }

  onProductToggled(product: Product, checked: boolean) {
    if (checked) {
      this.orderItem = this.lOrderService.addProductTo(this.orderItem, product);
    } else {
      this.orderItem = this.lOrderService.removeProductFrom(this.orderItem, product);
    }
  }

  onSizeChanged(product: Product, size: any) {
    this.orderItem = this.lOrderService.updateProductIn(this.orderItem, product);
  }

  order() {
    if (!this.orderItem.products.length) {
      return;
    }

    this.basket = this.lBasketService.putTo(this.basket, this.orderItem);
    this.onBasketChanged({basket: cloneDeep(this.basket)});
  }

  private initBasket() {
    this.basket = cloneDeep(this.basket);
  }

  private initOrderItem() {
    this.orderItem = new OrderItem();
  }
}

export const DayMenuComponent = {
  templateUrl: 'app/components/day-menu/day-menu.html',
  controller: DayMenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<',
    basket: '<',
    onBasketChanged: '&'
  }
};
