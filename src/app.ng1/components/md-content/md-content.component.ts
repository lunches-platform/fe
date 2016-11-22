import {IComponentOptions} from 'angular';

export const MdContentComponent: IComponentOptions = {
  template: `
    <md-content>
      <ng-transclude></ng-transclude>
    </md-content>
  `
};
