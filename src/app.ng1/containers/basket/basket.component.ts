import {cloneDeep, sumBy} from 'lodash';
import {IScope, ILogService} from 'angular';

type ISidenavService = angular.material.ISidenavService;

import {RouterWrapper} from '../../../app/ng1';

import {IOrder, OrderService} from '../../models/order';
import {IUser, UserService} from '../../models/user';
import {ToastService} from '../../models/toast';
import {IBasket, BasketService} from '../../models/basket';

export class BasketController {
  // bindings ------------------------------------------------------------------
  // internal
  basket: IBasket;
  customer: string;
  address: string;
  ordersForReview: IOrder[];
  user: IUser;

  constructor(
    private router: RouterWrapper,
    private $scope: IScope,
    private $log: ILogService,
    private $mdSidenav: ISidenavService,
    private lBasketService: BasketService,
    private lOrderService: OrderService,
    private lToastService: ToastService,
    private lUserService: UserService
  ) {
    'ngInject';

    this.initUser();
    this.initBasket();
  }

  // dom event handlers --------------------------------------------------------
  makeOrder(): void {
    this.lUserService.sync(this.user)
      .then(user => {
        this.updateUserInCache(user);
        return this.lOrderService.placeOrders(this.basket.orders);
      })
      .then(() => {
        this.lToastService.show('Спасибо! Заказ размещен!');
        this.clearBasket();
        this.router.navigate(['/payment']);
      })
      .catch(err => {
        this.lToastService.show('Ошибка! Не удалось разместить заказ');
      });
  }

  onToggleSidebar(): void {
    this.$mdSidenav('left').toggle();
  }

  goToWeekMenu(): void {
    this.router.navigate(['/week-menu']);
  }

  goToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }

  removeFromBasket(order: IOrder) {
    this.basket = this.lBasketService.removeOrderFrom(this.basket, order);
    this.lBasketService.sync(this.basket);
  }

  restoreToBasket(order: IOrder) {
    this.basket = this.lBasketService.addOrderTo(this.basket, order);
    this.lBasketService.sync(this.basket);
  }

  onUserChanged(user: IUser): void {
    this.user = user;

    this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, user);
    this.lBasketService.sync(this.basket);
  }

  // view helpers --------------------------------------------------------------
  hasData(): boolean {
    return Boolean(this.basket.orders.length);
  }

  isEmpty(): boolean {
    return !this.hasData();
  }

  isOrdersValid(): boolean {
    return this.lOrderService.isValidAll(this.basket.orders);
  }

  totalToPay(): number {
    return sumBy(this.basket.orders, 'price');
  }
  // private init --------------------------------------------------------------
  private initBasket(): void {
    this.lBasketService.fetchBasket()
      .then(basket => {
        this.basket = this.lBasketService.setUserToEachOrderIn(basket, this.user);
      })
      .catch(err => {
        this.$log.info('BasketController: Unable to fetch basket. Create new empty one');

        this.basket = this.lBasketService.createEmptyBasket();
        this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, this.user);
      })
      .finally(() => {
        this.initOrdersForReview();
        this.lBasketService.sync(this.basket);
      });
  }

  private initOrdersForReview(): void {
    this.ordersForReview = cloneDeep(this.basket.orders);
  }

  private initUser(): void {
    this.user = this.lUserService.me();
  }

  // private helpers -----------------------------------------------------------
  private clearBasket(): void {
    this.basket = this.lBasketService.clearBasket(this.basket);
    this.lBasketService.sync(this.basket);
  }

  private updateUserInCache(user: IUser): void {
    this.user = user;
    this.basket = this.lBasketService.setUserToEachOrderIn(this.basket, user);
    this.lBasketService.sync(this.basket);
  }

  // private event handlers ----------------------------------------------------
}

// component definition --------------------------------------------------------
export const BasketComponent = {
  template: require('./basket.html'),
  controller: BasketController,
  controllerAs: 'vm'
};

