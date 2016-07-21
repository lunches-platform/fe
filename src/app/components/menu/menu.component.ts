import {Menu} from './menu.service';
import {Order, OrderService} from '../../models/order.service';
import {OrderForm, OrderFormService} from './order.form';
import {LineItem, LineItemService} from '../line-item/line-item.service';
import {filter} from 'lodash';
import {IScope} from 'angular';
import {IWeekMenuState} from '../../../routes';

interface ITriggerOrderPlaceEvent {
  (arg: { order: Order }): void;
}

export class MenuController {
  // input bindings
  menu: Menu;
  order: Order;

  // output bindings
  triggerOrderPlaceEvent: ITriggerOrderPlaceEvent;

  // internal bindings
  orderForm: OrderForm;
  price: number;

  private lineItemsAddedToOrder = false;

  constructor(
    private $scope: IScope,
    private $state: IWeekMenuState,
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

    this.lineItemsAddedToOrder = true;

    this.triggerOrderPlaceEvent({order: this.order});
  }

  isLineItemsAddedToOrder(): boolean {
    return this.lineItemsAddedToOrder;
  }

  orderAgain() {
    this.initOrderForm();
    this.lineItemsAddedToOrder = false;
  }

  goToBasket() {
    this.$state.go('basket');
  }

  private initOrder() {
    this.order = new Order(this.menu.date);
  }

  private initOrderForm() {
    this.initOrder();

    this.orderForm = new OrderForm();

    this.orderForm = this.lOrderFormService.addItems(this.menu.products.map(product => {
      return new LineItem(product);
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
  template: require('./menu.html'),
  controller: MenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<',
    triggerOrderPlaceEvent: '&onOrderPlaced'
  }
};
