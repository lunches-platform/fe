import {IComponentOptions} from 'angular';
import {IBaseState} from '../../../routes';

export class ToolbarController {
  constructor(private $state: IBaseState) {
    'ngInject';
  }

  goToWeekMenu() {
    this.$state.go('week-menu');
  }
}

// component definition --------------------------------------------------------
export const ToolbarComponent: IComponentOptions = {
  template: require('./toolbar.html'),
  controller: ToolbarController,
  controllerAs: 'vm',
  transclude: {
    beforeTitle: '?lToolbarBeforeTitle',
    atRight: '?lToolbarAtRight'
  }
};

