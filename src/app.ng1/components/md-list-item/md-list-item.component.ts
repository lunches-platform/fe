import {IComponentOptions} from 'angular';

export const MdListItemComponent: IComponentOptions = {
  template: `
    <md-list-item ng-class="{{ vm.klass.split(' ') }}">
      <ng-transclude></ng-transclude>
    </md-list-item>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
