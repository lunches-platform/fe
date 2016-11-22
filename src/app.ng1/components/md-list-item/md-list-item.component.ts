import {IComponentOptions} from 'angular';

export const MdListItemComponent: IComponentOptions = {
  template: `
    <md-list-item class="{{ vm.klass }}">
      <ng-transclude></ng-transclude>
    </md-list-item>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
