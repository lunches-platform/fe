import {IComponentOptions} from 'angular';

export const MdButtonComponent: IComponentOptions = {
  template: '<md-button class="{{ vm.class }}"><ng-transclude></ng-transclude></md-button>',
  controllerAs: 'vm',
  bindings: {
    class: '@'
  }
};
