import {IScope, IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

interface ITriggerChangeEvent {
  (arg: { week: Week }): void;
}

export enum Week {
  Current,
  Next
}

export class WeekSwitcherController {
  // bindings ------------------------------------------------------------------
  // input
  inputSelected: Week;

  // output
  triggerChangeEvent: ITriggerChangeEvent;

  // internal
  selected: Week;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initSelectedWeek();
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    if (changes['inputSelected']) { // tslint:disable-line:no-string-literal
      this.selected = this.inputSelected;
    }
  }

  private initSelectedWeek(): void {
    this.selected = this.inputSelected || Week.Current;

    this.$scope.$watch(() => this.selected, this.onWeekChanged.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onWeekChanged(newWeek: string): void {
    this.selected = parseInt(newWeek, 10);

    if (this.inputSelected === this.selected) {
      return;
    }

    this.triggerChangeEvent({week: this.selected});
  }
}

// component definition --------------------------------------------------------
export const WeekSwitcherComponent: IComponentOptions = {
  template: require('./week-switcher.html'),
  controller: WeekSwitcherController,
  controllerAs: 'vm',
  bindings: {
    inputSelected: '<selected',
    triggerChangeEvent: '&onChanged'
  }
};

