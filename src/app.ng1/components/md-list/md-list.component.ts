import {IComponentOptions} from 'angular';

export const MdListComponent: IComponentOptions = {
  template: `
    <md-list ng-class="{{ vm.klass.split(' ') }}">
      <ng-transclude></ng-transclude>
    </md-list>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
