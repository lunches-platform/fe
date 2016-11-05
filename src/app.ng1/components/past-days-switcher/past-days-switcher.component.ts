import {IComponentOptions} from 'angular';

export const PastDaysSwitcherComponent: IComponentOptions = {
  template: require('./past-days-switcher.html'),
  controllerAs: 'vm',
  bindings: {
    switched: '<',
    toggle: '&onSwitched'
  }
};
