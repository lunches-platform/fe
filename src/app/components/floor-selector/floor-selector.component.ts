import {IComponentOptions, IOnChangesObject} from 'angular';

import {ISelectorItem} from '../selector/selector.component';

// internal types --------------------------------------------------------------
interface ITriggerFloorSelectEvent {
  (arg: { floor: string }): void;
}

export class FloorSelectorController {
  // bindings ------------------------------------------------------------------
  // input
  inputFloor: string;

  // output
  triggerFloorSelectEvent: ITriggerFloorSelectEvent;

  // internal
  selectedFloor: ISelectorItem;
  floors: ISelectorItem[];

  private floorToTitleMap;

  constructor() {
    this.initFloorToTitleMap();
    this.initFloors();
  }

  // dom event handlers --------------------------------------------------------
  onSelected(floor: ISelectorItem): void {
    if (floor.id === this.inputFloor) {
      return;
    }

    this.triggerFloorSelectEvent({floor: floor.id});
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IOnChangesObject) {
    /* tslint:disable:no-string-literal */
    if (changes['inputFloor']) {
      this.onInputFloorChanged(changes['inputFloor'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initFloors(): void {
    this.floors = [
      this.createSelectorItemFor('1'),
      this.createSelectorItemFor('2'),
      this.createSelectorItemFor('3')
    ];
  }

  private initFloorToTitleMap(): void {
    this.floorToTitleMap = {
      '1': 'Первый',
      '2': 'Второй',
      '3': 'Третий'
    };
  }

  // private helpers -----------------------------------------------------------
  private createSelectorItemFor(floor: string): ISelectorItem {
    return {
      id: floor,
      title: this.floorToTitleMap[floor]
    };
  }

  // private event handlers ----------------------------------------------------
  private onInputFloorChanged(inputFloor: string): void {
    this.selectedFloor = this.createSelectorItemFor(inputFloor);
  }
}

// component definition --------------------------------------------------------
export const FloorSelectorComponent: IComponentOptions = {
  template: require('./floor-selector.html'),
  controller: FloorSelectorController,
  controllerAs: 'vm',
  bindings: {
    inputFloor: '<selectedFloor',
    triggerFloorSelectEvent: '&onFloorSelected'
  }
};

