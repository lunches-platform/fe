import {isNil} from 'lodash';
import {IScope, IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

// internal types --------------------------------------------------------------
interface ITriggerSwitchEvent {
  (arg: { checked: boolean }): void;
}

export class SwitchController {
  // bindings ------------------------------------------------------------------
  // input
  inputSwithed: boolean;

  // output
  triggerSwitchEvent: ITriggerSwitchEvent;

  // internal
  checked: boolean;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initSwitched();
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    /* tslint:disable:no-string-literal */
    if (changes['inputSwitched']) {
      this.onInputSwitched(changes['inputSwitched'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initSwitched(): void {
    this.checked = false;
    this.inputSwithed = false;

    this.$scope.$watch('vm.checked', this.onSwitched.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onInputSwitched(checked: boolean): void {
    if (isNil(checked)) {
      return;
    }

    this.checked = checked;
  }

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
    inputSwitched: '<?switched',
    triggerSwitchEvent: '&onSwitch'
  },
  transclude: true
};
