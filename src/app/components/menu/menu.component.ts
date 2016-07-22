import {cloneDeep} from 'lodash';
import {IScope} from 'angular';

import {IMenu} from './menu.service';
import {IProduct} from '../../models/product';
import {IOrder, OrderService} from '../../models/order';
import {IOrderForm, OrderFormService} from './order.form';
import {ILineItem, LineItemService} from '../line-item/line-item.service';
import {IWeekMenuState} from '../../../routes';

interface ITriggerOrderPlaceEvent {
  (arg: { order: IOrder }): void;
}

export class MenuController {
  // bindings ------------------------------------------------------------------
  // input
  menu: IMenu;

  // output
  triggerOrderPlaceEvent: ITriggerOrderPlaceEvent;

  // internal
  order: IOrder;
  orderForm: IOrderForm;
  lineItemsForReview: ILineItem[];
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

    this.initPrice();
  }

  // dom event handlers --------------------------------------------------------
  onItemChanged(item: ILineItem): void {
    this.orderForm = this.lOrderFormService.updateItem(item, this.orderForm);
  }

  onItemToggled(item: ILineItem, checked: boolean): void {
    if (checked) {
      this.orderForm = this.lOrderFormService.addItemTo(this.orderForm, item);
    } else {
      this.orderForm = this.lOrderFormService.removeItemFrom(this.orderForm, item);
    }
  }

  addToOrder(): void {
    this.order = this.lOrderService.addLineItems(this.orderForm.items, this.order);

    this.lineItemsAddedToOrder = true;

    this.triggerOrderPlaceEvent({order: this.order});
  }

  orderAgain(): void {
    this.initOrderForm();
    this.lineItemsAddedToOrder = false;
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  // view helpers --------------------------------------------------------------
  calcPrice(): number {
    return this.lLineItemService.calcPriceForAll(this.orderForm.items);
  }

  isLineItemsAddedToOrder(): boolean {
    return this.lineItemsAddedToOrder;
  }

  // private init --------------------------------------------------------------
  // todo: add typings
  $onChanges(changes) {
    if (changes.menu) {
      this.onInputMenuChanged(this.menu);

      this.init();
    }
  }

  private init() {
    this.initLineItemsForReview();
    this.initOrderForm();
  }

  private initOrder() {
    this.order = this.lOrderService.createOrderByDate(this.menu.date);
  }

  private initOrderForm() {
    // reset order
    this.initOrder();

    this.orderForm = this.lOrderFormService.createOrderFormWith(this.lineItemsForReview);
  }

  private initLineItemsForReview() {
     this.lineItemsForReview = this.createLineItemsBy(this.menu.products);
  }

  private initPrice() {
    this.$scope.$watch(() => this.orderForm, this.updatePrice.bind(this));
  }

  // private helpers -----------------------------------------------------------
  private createLineItemsBy(products: IProduct[]): ILineItem[] {
    return products.map(product => {
      return this.lLineItemService.createLineItem(product);
    });
  }

  private updatePrice() {
    this.price = this.calcPrice();
  }

  // private event handlers ----------------------------------------------------
  private onInputMenuChanged(menu: IMenu) {
    this.menu = cloneDeep(menu);
  }
}

// component definition --------------------------------------------------------
export const MenuComponent = {
  template: require('./menu.html'),
  controller: MenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<',
    triggerOrderPlaceEvent: '&onOrderPlaced'
  }
};
