import * as moment from 'moment';
import { cloneDeep } from 'lodash';
import { IScope, IComponentOptions, IOnChangesObject } from 'angular';

import { RouterWrapper } from '../../../app/core';

import { IMenu, MenuService } from '../../models/menu';
import { IOrder, OrderService } from '../../models/order';
import { ILineItem, LineItemService } from '../../models/line-item';
import { ProductTypeUrls } from '../../models/product';
import { PriceService } from '../../models/price';

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
  lineItemsAvailable: ILineItem[];
  size: string;

  private lineItemsAddedToOrder = false;
  private customLunch: boolean;
  private selectedLineItems: ILineItem[];

  constructor(
    private $scope: IScope,
    private router: RouterWrapper,
    private lOrderService: OrderService,
    private lLineItemService: LineItemService,
    private lPriceService: PriceService,
    private lMenuService: MenuService
  ) {
    'ngInject';
  }

  // dom event handlers --------------------------------------------------------
  addToOrder(): void {
    this.order = this.lOrderService.setLineItems(this.selectedLineItems, this.order);

    this.lineItemsAddedToOrder = true;

    this.triggerOrderPlaceEvent({order: this.order});
  }

  orderAgain(): void {
    this.init();

    this.lineItemsAddedToOrder = false;
  }

  goToBasket(): void {
    this.router.navigate(['/basket']);
  }

  onCustomizeLunch(): void {
    this.toggleCustomLunch();
  }

  onLineItemToggled(inputItem: ILineItem, checked: boolean): void {
    let item = this.lLineItemService.setSizeFor(inputItem, this.size);
    if (checked) {
      this.selectedLineItems = this.lLineItemService.addItemTo(this.selectedLineItems, item);
    } else {
      this.selectedLineItems = this.lLineItemService.removeItemFrom(this.selectedLineItems, item);
    }
  }

  // view helpers --------------------------------------------------------------
  isOrdered(): boolean {
    return this.lineItemsAddedToOrder;
  }

  timeBeforeOrderImpossible(): string {
    return moment(this.menu.date).fromNow();
  }

  isCustomLunch(): boolean {
    return this.customLunch;
  }

  isPredefinedLunch(): boolean {
    return !this.isCustomLunch();
  }

  orderButtonText(): string {
    return this.isCustomLunch() ? 'Беру свой' : 'Беру готовый';
  }

  customizeLunchButtonText(): string {
    return this.isCustomLunch() ? 'Вернуть готовый' : 'Собрать свой';
  }

  productTypeToIconUrl(type: string): string {
    return ProductTypeUrls[type];
  }

  calcPrice(): number {
    return this.lPriceService.calcPriceForAll(this.selectedLineItems, this.menu.date);
  }

  getCoverOf(menu: IMenu): string {
    return this.lMenuService.getCoverOf(menu);
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IOnChangesObject) {
    if (changes['menu']) { // tslint:disable-line:no-string-literal
      this.onInputMenuChanged(this.menu);
    }
  }

  private init(): void {
    this.initOrder();
    this.initSize();
    this.initLunchCustomization();
  }

  private initOrder(): void {
    this.order = this.lOrderService.createOrderByDate(this.menu.date);
    this.lineItemsAvailable = this.createPredefinedLineItems();
    this.selectedLineItems = this.createPredefinedLineItems();
  }

  private initSize(): void {
    this.size = 'medium';

    this.$scope.$watch(() => this.size, this.onSizeChanged.bind(this));
  }

  private initLunchCustomization(): void {
    this.customLunch = false;
  }

  // private helpers -----------------------------------------------------------
  private createPredefinedLineItems(): ILineItem[] {
    return this.lLineItemService.createLineItemsBy(this.menu.products);
  }

  // private event handlers ----------------------------------------------------
  private onInputMenuChanged(menu: IMenu) {
    this.menu = cloneDeep(menu);

    this.init();
  }

  private toggleCustomLunch(): void {
    this.customLunch = !this.customLunch;
    if (this.customLunch) {
      this.selectedLineItems = [];
    } else {
      this.selectedLineItems = this.createPredefinedLineItems();
      this.selectedLineItems = this.lLineItemService.setSizeForAll(this.selectedLineItems, this.size);
    }
  }

  private onSizeChanged(size: string): void {
    this.size = size;

    this.selectedLineItems = this.lLineItemService.setSizeForAll(this.selectedLineItems, size);
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
