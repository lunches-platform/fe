import {IComponentOptions} from 'angular';

import {IMenu, MenuService} from '../../models/menu';

export class MenuCoverController {
  // bindings ------------------------------------------------------------------
  // input
  inputMenu: IMenu;

  constructor(private lMenuService: MenuService) {
    'ngInject';
  }

  url(): string {
    return this.lMenuService.getCoverOf(this.inputMenu);
  }
}

// component definition --------------------------------------------------------
export const MenuCoverComponent: IComponentOptions = {
  template: require('./menu-cover.html'),
  controller: MenuCoverController,
  controllerAs: 'vm',
  bindings: {
    inputMenu: '<menu'
  }
};
