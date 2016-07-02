import {WeekMenuService} from './week-menu.service';
import {Basket} from '../../models/basket.service';
import {cloneDeep} from 'lodash';

class WeekMenuController {
  // bindings
  basket: Basket;
  triggerBasketChange: Function;

  // menus: Menu[];
  menus;

  constructor(private lWeekMenuService: WeekMenuService) {
    'ngInject';

    this.initBasket();
    this.fetchData();
  }

  onBasketChanged(basket: Basket) {
    this.basket = basket;

    this.triggerBasketChange({ basket: cloneDeep(this.basket) });
  }

  private initBasket() {
    this.basket = cloneDeep(this.basket);
  }

  private fetchData() {
    this.lWeekMenuService.fetchAll()
      // .then((menus: Menu[]) => {
      .then((menus) => {
        this.menus = menus;
      })
    ;
  }
}

export const WeekMenuComponent = {
  templateUrl: 'app/components/week-menu/week-menu.html',
  controller: WeekMenuController,
  controllerAs: 'vm',
  bindings: {
    basket: '<',
    triggerBasketChange: '&onBasketChanged'
  }
};
