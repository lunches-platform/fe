import {IComponentOptions} from 'angular';

// style="padding: 0" hack is needed because "layout-padding" assigned in klass will add padding to childs too
export const MdContentComponent: IComponentOptions = {
  template: `
    <md-content class="{{ vm.klass }}">
      <ng-transclude style="padding: 0"></ng-transclude>
    </md-content>
  `,
  controllerAs: 'vm',
  bindings: {
    klass: '@'
  }
};
