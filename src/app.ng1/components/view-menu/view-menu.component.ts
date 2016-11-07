import {IComponentOptions} from 'angular';

import {ProductTypeUrls} from '../../models/product';
import {IMenu, MenuService} from '../../models/menu';

export class ViewMenuController {
  constructor(private lMenuService: MenuService) {
    'ngInject';
  }

  productTypeToIconUrl(type: string): string {
    return ProductTypeUrls[type];
  }

  getCoverOf(menu: IMenu): string {
    return this.lMenuService.getCoverOf(menu);
  }
}

export const ViewMenuComponent: IComponentOptions = {
  template: require('./view-menu.html'),
  controller: ViewMenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<'
  }
};
