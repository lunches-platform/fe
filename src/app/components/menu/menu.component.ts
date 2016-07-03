import {Product} from '../product/product.service';
import {Menu, MenuService} from './menu.service';
import {Order, OrderService} from '../../models/order.service';
import {ISize} from '../size-selector/size-selector.component';
import {cloneDeep} from 'lodash';

interface ITriggerOrderChangeEvent {
  (arg: { order: Order }): void;
}

export class MenuController {
  // input bindings
  menu: Menu;
  order: Order;

  // output bindings
  triggerOrderChange: ITriggerOrderChangeEvent;

  // internal bindings

  constructor(
    private lMenuService: MenuService,
    private lOrderService: OrderService
  ) {
    'ngInject';

    this.initOrder();
  }

  calcPrice() {
    return this.lOrderService.calcPriceForIn(this.menu, this.order);
  }

  onProductToggled(product: Product, checked: boolean, size: ISize, quantity: number) {
    if (checked) {
      this.order = this.lOrderService.addProductTo(this.order, this.menu, product, size, quantity);
    } else {
      this.order = this.lOrderService.removeProductFrom(this.order, this.menu, product);
    }

    this.triggerOrderChange({order: this.order});
  }

  onSizeChanged(product: Product, size: ISize) {
    this.order = this.lOrderService.updateSizeForProductIn(this.order, product, size);

    this.triggerOrderChange({order: this.order});
  }

  onQuantityChanged(product: Product, quantity: number) {
    this.order = this.lOrderService.updateQuantityForProductIn(this.order, product, quantity);

    this.triggerOrderChange({order: this.order});
  }

  private initOrder() {
    this.order = cloneDeep(this.order);
  }
}

export const MenuComponent = {
  templateUrl: 'app/components/menu/menu.html',
  controller: MenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<',
    order: '<',
    triggerOrderChange: '&onOrderChanged'
  }
};
