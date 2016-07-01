import {cloneDeep} from 'lodash';

// todo: add types
class SizeSelectorController {
  // bindings
  onSizeSelected: any;
  defaultSize: any;

  selectedSize: any;
  sizes: any[];

  constructor() {
    this.initSelectedSize();
    this.initSizes();
  }

  onSelected(size: any) {
    this.onSizeSelected({size});
  }

  private initSelectedSize() {
    this.selectedSize = cloneDeep(this.defaultSize);
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
    defaultSize: '<',
    onSizeSelected: '&'
  }
};

