import {isNil} from 'lodash';
import {IComponentOptions} from 'angular';

import {IBaseState} from '../../../routes';

import {MenuType} from '../../models/menu';

// internal types --------------------------------------------------------------
interface ITriggerMenuTypeSwitchEvent {
  (arg: { menuType: MenuType }): void;
}

export class ToolbarController {
  // bindings ------------------------------------------------------------------
  // input
  inputMenuType: string;

  // output
  triggerMenuTypeSwitchEvent: ITriggerMenuTypeSwitchEvent;

  constructor(private $state: IBaseState) {
    'ngInject';
  }

  goToBasket(): void {
    this.$state.go('basket');
  }

  goToMyOrders(): void {
    this.$state.go('my-orders');
  }

  isSwitched(): boolean {
    return this.inputMenuType === 'diet';
  }

  onMenuTypeSwitched(checked: boolean): void {
    if (isNil(checked)) {
      return;
    }

    this.triggerMenuTypeSwitchEvent({menuType: (checked ? 'diet' : 'regular')});
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm',
  bindings: {
    inputMenuType: '<selectedMenuType',
    triggerMenuTypeSwitchEvent: '&onMenuTypeSwitched'
  }
};
