import { IComponentOptions } from 'angular';

export const MdIconComponent: IComponentOptions = {
  template: `
    <md-icon aria-label="{{ vm.ariaLabel }}">
      <ng-transclude></ng-transclude>
    </md-icon>
  `,
  controllerAs: 'vm',
  bindings: {
    ariaLabel: '@'
  }
};
