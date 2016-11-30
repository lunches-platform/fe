import * as moment from 'moment';
import { cloneDeep } from 'lodash';
import { IComponentOptions, IScope, IOnChangesObject } from 'angular';

import { SHORT_DATE_FORMAT } from '../../../config';

// exported types --------------------------------------------------------------
export interface IDateRange {
  startDate: string;
  endDate: string;
}

// internal types --------------------------------------------------------------
interface ITriggerChangeEvent {
  (arg: { dateRange: IDateRange }): void;
}

export class DateRangeSelectorController {

  // bindings ------------------------------------------------------------------
  // input
  inputDateRange: IDateRange;

  // output
  triggerChangeEvent: ITriggerChangeEvent;

  // internal
  startDate: Date;
  endDate: Date;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initDateRange();
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IOnChangesObject) {
    /* tslint:disable:no-string-literal */
    if (changes['inputDateRange']) {
      this.onInputDateRangeChanged(changes['inputDateRange'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initDateRange(): void {
    this.startDate = moment().startOf('week').toDate();
    this.endDate = moment().endOf('week').toDate();

    this.$scope.$watchGroup([
      () => this.startDate,
      () => this.endDate,
    ], this.onDateRangeChanged.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onInputDateRangeChanged(inputDateRange: IDateRange): void {
    if (!this.isDateRangeValid(inputDateRange)) {
      return;
    }

    this.inputDateRange = cloneDeep(inputDateRange);

    this.startDate = moment(inputDateRange.startDate).toDate();
    this.endDate = moment(inputDateRange.endDate).toDate();
  }

  private onDateRangeChanged(dateRange: string[]): void {
    if (!dateRange[0] || !dateRange[1]) {
      return;
    }

    const startDate = moment(dateRange[0]).format(SHORT_DATE_FORMAT);
    const endDate = moment(dateRange[1]).format(SHORT_DATE_FORMAT);
    const outputDateRange = {startDate, endDate};

    if (this.isDateRangeChanged(this.inputDateRange, outputDateRange)) {
      this.triggerChangeEvent({dateRange: outputDateRange});
    }
  }

  private isDateRangeValid(dateRange: IDateRange): boolean {
    return Boolean(dateRange && dateRange.startDate && dateRange.endDate);
  }

  private isDateRangeChanged(inputDateRange: IDateRange, outputDateRange: IDateRange) {
    return !this.isDateRangeValid(inputDateRange) || (
      this.isDateRangeValid(inputDateRange) &&
      this.isDateRangeValid(outputDateRange) &&
      !this.isDateRangesEqual(inputDateRange, outputDateRange)
    );
  }

  private isDateRangesEqual(dateRange1: IDateRange, dateRange2: IDateRange): boolean {
    return dateRange1.startDate === dateRange2.startDate && dateRange1.endDate === dateRange2.endDate;
  }
}

// component definition --------------------------------------------------------
export const DateRangeSelectorComponent: IComponentOptions = {
  template: require('./date-range-selector.html'),
  controller: DateRangeSelectorController,
  controllerAs: 'vm',
  bindings: {
    inputDateRange: '<range',
    triggerChangeEvent: '&onChanged'
  }
};
