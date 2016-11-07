import {IComponentOptions} from 'angular';

import {ProductTypeUrls} from '../../models/product';

export class ViewMenuController {
  productTypeToIconUrl(type: string): string {
    return ProductTypeUrls[type];
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
