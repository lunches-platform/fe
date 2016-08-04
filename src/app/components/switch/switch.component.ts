import {isNil} from 'lodash';
import {IScope, IComponentOptions} from 'angular';

// internal types --------------------------------------------------------------
interface ITriggerSwitchEvent {
  (arg: { checked: boolean }): void;
}

export class SwitchController {
  // bindings ------------------------------------------------------------------
  // output
  triggerSwitchEvent: ITriggerSwitchEvent;

  // internal
  checked: boolean;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initSwitchedItem();
  }

  // private init --------------------------------------------------------------
  private initSwitchedItem(): void {
    this.$scope.$watch('vm.checked', this.onSwitched.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onSwitched(checked: boolean): void {
    if (isNil(checked)) {
      return;
    }

    this.triggerSwitchEvent({checked});
  }
}

// component definition --------------------------------------------------------
export const SwitchComponent: IComponentOptions = {
  template: require('./switch.html'),
  controller: SwitchController,
  controllerAs: 'vm',
  bindings: {
    triggerSwitchEvent: '&onSwitch'
  }
};
