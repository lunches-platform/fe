import {IComponentOptions} from 'angular';

export const ViewMenuComponent: IComponentOptions = {
  template: require('./view-menu.html'),
  controllerAs: 'vm',
  bindings: {
    menu: '<'
  }
};
