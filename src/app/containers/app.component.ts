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

export const AppComponent = {
  templateUrl: 'app/containers/app.html',
  controller: AppController,
  controllerAs: 'vm'
};
