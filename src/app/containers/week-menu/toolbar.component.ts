import {isNil} from 'lodash';
import {IComponentOptions} from 'angular';

import {IBaseState} from '../../../routes';

import {MenuType} from '../../models/menu';
import {IUser, UserService} from '../../models/user';

// internal types --------------------------------------------------------------
interface ITriggerMenuTypeSwitchEvent {
  (arg: { menuType: MenuType }): void;
}

export class ToolbarController {
  // bindings ------------------------------------------------------------------
  // input
  inputMenuType: string;
  inputUser: IUser;

  // output
  triggerMenuTypeSwitchEvent: ITriggerMenuTypeSwitchEvent;

  // internal
  title: string;

  constructor(private $state: IBaseState, private lUserService: UserService) {
    'ngInject';

    this.initTitle();
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

  isUserRegistered(): boolean {
    return this.lUserService.isRegistered(this.inputUser);
  }

  onMenuTypeSwitched(checked: boolean): void {
    if (isNil(checked)) {
      return;
    }

    this.updateTitle(checked);
    this.triggerMenuTypeSwitchEvent({menuType: (checked ? 'diet' : 'regular')});
  }

  private updateTitle(checked: boolean): void {
    this.title = checked  ? 'Диетическое меню' : 'Запись на неделю';
  }

  private initTitle(): void {
    this.title = 'Запись на неделю';
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm',
  bindings: {
    inputMenuType: '<selectedMenuType',
    inputUser: '<user',
    triggerMenuTypeSwitchEvent: '&onMenuTypeSwitched'
  }
};
