import { IComponentOptions } from 'angular';

export const MdCardComponent: IComponentOptions = {
  template: `
    <md-card>
      <ng-transclude></ng-transclude>
    </md-card>
  `,
  controllerAs: 'vm'
};
