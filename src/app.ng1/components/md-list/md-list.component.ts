import {IComponentOptions} from 'angular';

export const MdListComponent: IComponentOptions = {
  template: `
    <md-list class="{{ vm.klass }}">
      <ng-transclude></ng-transclude>
    </md-list>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
