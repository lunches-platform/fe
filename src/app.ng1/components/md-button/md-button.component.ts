import { IComponentOptions } from 'angular';

export const MdButtonComponent: IComponentOptions = {
  template: `
    <md-button ng-class="{{ vm.klass.split(' ') }}">
      <ng-transclude></ng-transclude>
    </md-button>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
