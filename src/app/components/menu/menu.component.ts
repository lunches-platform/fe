import {Menu} from './menu.service';
import {Order, OrderService} from '../../models/order.service';
import {OrderForm, OrderFormService} from './order.form';
import {LineItem, LineItemService} from '../line-item/line-item.service';
import {cloneDeep, filter} from 'lodash';
import {IScope} from 'angular';

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
  orderForm: OrderForm;
  price: number;

  private lineItemsAddedToBasket = false;

  constructor(
    private $scope: IScope,
    private lOrderService: OrderService,
    private lOrderFormService: OrderFormService,
    private lLineItemService: LineItemService
  ) {
    'ngInject';

    this.initOrder();
    this.initOrderForm();
    this.initPrice();
  }

  calcPrice() {
    return this.lLineItemService.calcPriceForAll(
      filter(this.orderForm.items, ['checked', true])
    );
  }

  onItemChanged(item: LineItem) {
    this.orderForm = this.lOrderFormService.updateItem(item, this.orderForm);
  }

  addToOrder() {
    this.order = this.lOrderService.addLineItems(
      filter(this.orderForm.items, ['checked', true]),
      this.order
    );

    this.lineItemsAddedToBasket = true;

    this.triggerOrderChange({order: this.order});
  }

  isLineItemsAddedToBasket(): boolean {
    return this.lineItemsAddedToBasket;
  }

  orderAgain() {
    this.initOrderForm();
    this.lineItemsAddedToBasket = false;
  }

  private initOrder() {
    this.order = cloneDeep(this.order);
  }

  private initOrderForm() {
    this.orderForm = new OrderForm();

    this.orderForm = this.lOrderFormService.addItems(this.menu.products.map(product => {
      return new LineItem(product, this.menu.date);
    }), this.orderForm);
  }

  private initPrice() {
    this.$scope.$watch(() => this.orderForm, this.updatePrice.bind(this));
  }

  private updatePrice() {
    this.price = this.calcPrice();
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
