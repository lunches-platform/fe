import {IComponentOptions} from 'angular';

export const MdSidenavComponent: IComponentOptions = {
  template: `
    <md-sidenav
      ng-class="{{ vm.klass.split(' ') }}"
      md-is-locked-open="vm.mdIsLockedOpen"
      md-component-id="{{ vm.mdComponentId }}">
      <ng-transclude></ng-transclude>
    </md-sidenav>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@',
    mdIsLockedOpen: '<',
    mdComponentId: '@'
  }
};
