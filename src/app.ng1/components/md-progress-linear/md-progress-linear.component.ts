import { IComponentOptions } from 'angular';

export const MdProgressLinearComponent: IComponentOptions = {
  template: `
    <md-progress-linear md-mode="{{ vm.mdMode }}"></md-progress-linear>
  `,
  controllerAs: 'vm',
  bindings: {
    mdMode: '@'
  }
};
