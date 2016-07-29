import {IComponentOptions} from 'angular';

import {IChangesList} from '../../../config';

import {ISelectorItem} from '../selector/selector.component';

// internal types --------------------------------------------------------------
interface ITriggerSizeSelectEvent {
  (arg: { size: string }): void;
}

export class SizeSelectorController {
  // bindings ------------------------------------------------------------------
  // input
  inputSize: string;

  // output
  triggerSizeSelectEvent: ITriggerSizeSelectEvent;

  // internal
  selectedSize: ISelectorItem;
  sizes: ISelectorItem[];

  private sizeToTitleMap;

  constructor() {
    this.initSizeToTitleMap();
    this.initSizes();
  }

  // dom event handlers --------------------------------------------------------
  onSelected(size: ISelectorItem): void {
    this.triggerSizeSelectEvent({size: size.id});
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IChangesList) {
    /* tslint:disable:no-string-literal */
    if (changes['inputSize']) {
      this.onInputSizeChanged(changes['inputSize'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initSizes(): void {
    this.sizes = [
      this.createSelectorItemFor('medium'),
      this.createSelectorItemFor('big')
    ];
  }

  private initSizeToTitleMap(): void {
    this.sizeToTitleMap = {
      medium: 'Средняя',
      big: 'Большая'
    };
  }

  // private helpers -----------------------------------------------------------
  private createSelectorItemFor(size: string): ISelectorItem {
    return {
      id: size,
      title: this.sizeToTitleMap[size]
    };
  }

  // private event handlers ----------------------------------------------------
  private onInputSizeChanged(inputSize: string): void {
    this.selectedSize = this.createSelectorItemFor(inputSize);
  }
}

// component definition --------------------------------------------------------
export const SizeSelectorComponent: IComponentOptions = {
  template: require('./size-selector.html'),
  controller: SizeSelectorController,
  controllerAs: 'vm',
  bindings: {
    inputSize: '<selectedSize',
    triggerSizeSelectEvent: '&onSizeSelected'
  }
};

