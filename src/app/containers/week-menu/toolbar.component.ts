import {IComponentOptions} from 'angular';
import {IBaseState} from '../../../routes';

export class ToolbarController {
  constructor(private $state: IBaseState) {
    'ngInject';
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm'
};

