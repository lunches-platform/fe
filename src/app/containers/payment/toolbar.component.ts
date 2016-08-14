import {IComponentOptions} from 'angular';
import {IBaseState} from '../../../routes';

export class ToolbarController {
  constructor(private $state: IBaseState) {
    'ngInject';
  }

  goToWeekMenu(): void {
    this.$state.go('week-menu');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  goToBasket(): void {
    this.$state.go('basket');
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm'
};

