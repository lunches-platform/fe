import {IComponentOptions} from 'angular';

// component definition --------------------------------------------------------
export const PaymentStatusComponent: IComponentOptions = {
  template: require('./payment-status.html'),
  controllerAs: 'vm',
  bindings: {
    paid: '<'
  }
};
