import {IComponentOptions} from 'angular';

export const MdToolbarComponent: IComponentOptions = {
  template: `
    <md-toolbar
      class="{{ vm.class }}">
      <ng-transclude></ng-transclude>
    </md-toolbar>
  `,
  controllerAs: 'vm',
  bindings: {
    class: '@'
  }
};
