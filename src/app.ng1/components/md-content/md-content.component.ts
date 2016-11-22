import {IComponentOptions} from 'angular';

export const MdContentComponent: IComponentOptions = {
  template: `
    <md-content class="{{ vm.class }}">
      <ng-transclude></ng-transclude>
    </md-content>
  `,
  controllerAs: 'vm',
  bindings: {
    class: '@'
  }
};
