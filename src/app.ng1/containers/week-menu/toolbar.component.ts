import { isNil } from 'lodash';
import { IComponentOptions } from 'angular';

import { RouterWrapper } from '../../../app/core';

import { MenuType } from '../../models/menu';
import { IUser, UserService } from '../../models/user';

// internal types --------------------------------------------------------------
interface ITriggerMenuTypeSwitchEvent {
  (arg: { menuType: MenuType }): void;
}

interface ITriggerToggleSidebarEvent {
  (): void;
}

interface ITriggerWholeWeekOrderEvent {
  (): void;
}

export class ToolbarController {
  // bindings ------------------------------------------------------------------
  // input
  inputMenuType: string;
  inputUser: IUser;

  // output
  triggerMenuTypeSwitchEvent: ITriggerMenuTypeSwitchEvent;
  triggerToggleSidebarEvent: ITriggerToggleSidebarEvent;
  triggerWholeWeekOrderEvent: ITriggerWholeWeekOrderEvent;

  // internal
  title: string;

  constructor(private router: RouterWrapper, private lUserService: UserService) {
    'ngInject';

    this.initTitle();
  }

  // dom event handlers --------------------------------------------------------
  orderForWholeWeek(): void {
    this.triggerWholeWeekOrderEvent();
  }

  goToBasket(): void {
    this.router.navigate(['/basket']);
  }

  goToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }

  toggleSidebar(): void {
    this.triggerToggleSidebarEvent();
  }

  onMenuTypeSwitched(checked: boolean): void {
    if (isNil(checked)) {
      return;
    }

    this.updateTitle(checked);
    this.triggerMenuTypeSwitchEvent({menuType: (checked ? 'diet' : 'regular')});
  }

  // view helpers --------------------------------------------------------------
  isSwitched(): boolean {
    return this.inputMenuType === 'diet';
  }

  isUserRegistered(): boolean {
    return this.lUserService.isRegistered(this.inputUser);
  }

  // private init --------------------------------------------------------------
  private initTitle(): void {
    this.title = 'Обычное меню';
  }

  // private helpers -----------------------------------------------------------
  private updateTitle(checked: boolean): void {
    this.title = checked  ? 'Диетическое меню' : 'Обычное меню';
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
    triggerMenuTypeSwitchEvent: '&onMenuTypeSwitched',
    triggerToggleSidebarEvent: '&onToggleSidebar',
    triggerWholeWeekOrderEvent: '&onWholeWeekOrder'
  }
};
