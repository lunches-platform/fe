import {Basket} from '../models/basket.service';

export class AppController {
  basket: Basket;

  constructor() {
    this.initBasket();
  }

  onBasketChanged(basket: Basket) {
    this.basket = basket;
  }

  private initBasket() {
    this.basket = new Basket();
  }
}

export const App = {
  templateUrl: 'app/containers/App.html',
  controller: AppController,
  controllerAs: 'vm'
};
