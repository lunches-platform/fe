import {IScope} from 'angular';

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
  private initSelectedWeek(): void {
    this.selected = this.inputSelected || Week.Current;

    this.$scope.$watch(() => this.selected, this.onWeekChanged.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onWeekChanged(): void {
    if (this.inputSelected === this.selected) {
      return;
    }

    this.triggerChangeEvent({week: this.selected});
  }
}

// component definition --------------------------------------------------------
export const WeekSwitcherComponent = {
  template: require('./week-switcher.html'),
  controller: WeekSwitcherController,
  controllerAs: 'vm',
  bindings: {
    inputSelected: '<selected',
    triggerChangeEvent: '&onChanged'
  }
};

