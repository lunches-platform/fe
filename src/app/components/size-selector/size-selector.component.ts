import {cloneDeep} from 'lodash';

export interface ISize {
  id: string;
  title: string;
}

// todo: add types
export class SizeSelectorController {
  // bindings
  onSizeSelected: any;
  inputSize: any;

  selectedSize: any;
  sizes: any[];

  constructor() {
    this.initSelectedSize();
    this.initSizes();
  }

  onSelected(size: ISize) {
    this.onSizeSelected({size});
  }

  private initSelectedSize() {
    this.selectedSize = cloneDeep(this.inputSize);
  }

  private initSizes() {
    this.sizes = [{
      id: 'small',
      title: 'Small'
    }, {
      id: 'mid',
      title: 'Middle'
    }, {
      id: 'big',
      title: 'Big'
    }];
  }
}

export const SizeSelectorComponent = {
  templateUrl: 'app/components/size-selector/size-selector.html',
  controller: SizeSelectorController,
  controllerAs: 'vm',
  bindings: {
    inputSize: '<selectedSize',
    onSizeSelected: '&'
  }
};

