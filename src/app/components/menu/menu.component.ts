import {cloneDeep} from 'lodash';
import {IScope, IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';
import {IWeekMenuState} from '../../../routes';

import {IMenu, MenuService} from '../../models/menu';
import {IOrder, OrderService} from '../../models/order';

import {ILineItem, LineItemService} from '../line-item/line-item.service';

// internal types --------------------------------------------------------------
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
  lineItems: ILineItem[];
  price: number;
  size: string;

  private lineItemsAddedToOrder = false;
  private coverIndex: number;

  constructor(
    private $scope: IScope,
    private $state: IWeekMenuState,
    private lOrderService: OrderService,
    private lLineItemService: LineItemService,
    private lMenuService: MenuService
  ) {
    'ngInject';

    this.init();
  }

  // dom event handlers --------------------------------------------------------
  addToOrder(): void {
    this.order = this.lOrderService.addLineItems(this.lineItems, this.order);

    this.lineItemsAddedToOrder = true;

    this.triggerOrderPlaceEvent({order: this.order});
  }

  orderAgain(): void {
    this.init();

    this.lineItemsAddedToOrder = false;
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  // view helpers --------------------------------------------------------------
  isLineItemsAddedToOrder(): boolean {
    return this.lineItemsAddedToOrder;
  }

  coverUrl(): string {
    return this.lMenuService.getCoverOf(this.menu, this.coverIndex);
  }

  nextCover(): void {
    const newCoverIndex = this.coverIndex + 1;
    if (newCoverIndex < this.menu.products.length) {
      this.coverIndex = this.coverIndex + 1;
    } else {
      this.coverIndex = 0;
    }
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    if (changes['menu']) { // tslint:disable-line:no-string-literal
      this.onInputMenuChanged(this.menu);
    }
  }

  private init(): void {
    this.initOrder();
    this.initPrice();
    this.initSize();
    this.initCover();
  }

  private initOrder() {
    this.order = this.lOrderService.createOrderByDate(this.menu.date);
    this.lineItems = this.lLineItemService.createLineItemsBy(this.menu.products);
  }

  private initPrice() {
    this.price = 0;
  }

  private initSize(): void {
    this.size = 'medium';

    this.$scope.$watch(() => this.size, this.onSizeChanged.bind(this));
  }

  private initCover(): void {
    this.coverIndex = 0;
  }

  // private helpers -----------------------------------------------------------
  private updatePrice(): void {
    this.price = this.lLineItemService.calcPriceForAll(this.lineItems);
  }

  // private event handlers ----------------------------------------------------
  private onInputMenuChanged(menu: IMenu) {
    this.menu = cloneDeep(menu);

    this.init();
  }

  private onSizeChanged(size: string): void {
    this.lineItems = this.lLineItemService.setSizeForAll(this.lineItems, size);
    this.updatePrice();
  }
}

// component definition --------------------------------------------------------
export const MenuComponent: IComponentOptions = {
  template: require('./menu.html'),
  controller: MenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<',
    triggerOrderPlaceEvent: '&onOrderPlaced'
  }
};
