import {Product} from '../product/product.service';
import {DayMenu, DayMenuService} from './day-menu.service';
import {Order, OrderService} from '../../models/order.service';
import {Basket, BasketService} from '../../models/basket.service';
import {ISize} from '../size-selector/size-selector.component';
import {cloneDeep} from 'lodash';

class DayMenuController {
  menu: DayMenu;
  basket: Basket;
  order: Order;
  onBasketChanged: Function;

  constructor(
    private lDayMenuService: DayMenuService,
    private lOrderService: OrderService,
    private lBasketService: BasketService
  ) {
    'ngInject';

    this.initBasket();

    this.initOrder();
  }

  calcPrice() {
    return this.lOrderService.calcPriceForAllProductsIn(this.order);
  }

  onProductToggled(product: Product, checked: boolean, size: ISize, amount: number) {
    if (checked) {
      this.order = this.lOrderService.addProductTo(this.order, product, size, amount);
    } else {
      this.order = this.lOrderService.removeProductFrom(this.order, product);
    }
  }

  onSizeChanged(product: Product, size: ISize) {
    this.order = this.lOrderService.updateSizeForProductIn(this.order, product, size);
  }

  onAmountChanged(product: Product, amount: number) {
    this.order = this.lOrderService.updateAmountForProductIn(this.order, product, amount);
  }

  putToBasket() {
    if (!this.order.items.length) {
      return;
    }

    this.basket = this.lBasketService.putTo(this.basket, this.order);
    this.onBasketChanged({basket: cloneDeep(this.basket)});
  }

  private initBasket() {
    this.basket = cloneDeep(this.basket);
  }

  private initOrder() {
    this.order = new Order();
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
