import {cloneDeep} from 'lodash';
import {IComponentOptions} from 'angular';

// todo: replace just with `id: string`. Get the title from translate file: DEZ-773
export interface ISize {
  id: string;
  title: string;
}

export class SizeSelectorController {
  // input bindings
  inputSize: ISize;

  // output bindings
  triggerSizeSelectEvent: ITriggerSizeSelectEvent;

  // internal bindings
  selectedSize: ISize;
  sizes: ISize[];

  constructor() {
    this.initSelectedSize();
    this.initSizes();
  }

  onSelected(size: ISize): void {
    this.triggerSizeSelectEvent({size});
  }

  private initSelectedSize(): void {
    this.selectedSize = cloneDeep(this.inputSize);
  }

  private initSizes(): void {
    this.sizes = [{
      id: 'medium',
      title: 'Middle'
    }, {
      id: 'big',
      title: 'Big'
    }];
  }
}

interface ITriggerSizeSelectEvent {
  (arg: { size: ISize }): void;
}

export const SizeSelectorComponent: IComponentOptions = {
  template: require('./size-selector.html'),
  controller: SizeSelectorController,
  controllerAs: 'vm',
  bindings: {
    inputSize: '<selectedSize',
    triggerSizeSelectEvent: '&onSizeSelected'
  }
};

