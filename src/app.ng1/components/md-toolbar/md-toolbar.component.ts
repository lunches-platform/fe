import {IComponentOptions} from 'angular';

export const MdToolbarComponent: IComponentOptions = {
  template: `
    <md-toolbar
      ng-class="{{ vm.klass.split(' ') }}">
      <ng-transclude></ng-transclude>
    </md-toolbar>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
