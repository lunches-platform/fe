import { IComponentOptions } from 'angular';

// component definition --------------------------------------------------------
export const SizeLabelComponent: IComponentOptions = {
  template: require('./size-label.html'),
  controllerAs: 'vm',
  bindings: {
    size: '<'
  }
};
