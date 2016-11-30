import { cloneDeep, isEqual } from 'lodash';
import { IScope, IComponentOptions, IOnChangesObject } from 'angular';

// exported types --------------------------------------------------------------
export interface ISelectorItem {
  id: string;
  title: string;
}

// internal types --------------------------------------------------------------
interface ITriggerSelectEvent {
  (arg: { item: ISelectorItem }): void;
}

export class SelectorController {
  // bindings ------------------------------------------------------------------
  // input
  inputSelectedItem: ISelectorItem;
  inputItems: ISelectorItem[];

  // output
  triggerSelectEvent: ITriggerSelectEvent;

  // internal
  selectedItem: ISelectorItem;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initSelectedItem();
  }

  // private init --------------------------------------------------------------
  $onChanges(changes: IOnChangesObject) {
    /* tslint:disable:no-string-literal */
    if (changes['inputSelectedItem']) {
      this.onInputSelectedItemChanged(changes['inputSelectedItem'].currentValue);
    }

    if (changes['items']) {
      this.onInputItemsChanged(changes['items'].currentValue);
    }
    /* tslint:enable:no-string-literal */
  }

  private initSelectedItem(): void {
    this.$scope.$watch('vm.selectedItem', this.onItemSelected.bind(this));
  }

  // private event handlers ----------------------------------------------------
  private onInputSelectedItemChanged(inputSelectedItem: ISelectorItem) {
    this.inputSelectedItem = cloneDeep(inputSelectedItem);
    this.selectedItem = cloneDeep(inputSelectedItem);
  }

  private onInputItemsChanged(items: ISelectorItem[]) {
    this.inputItems = cloneDeep(items);
  }

  private onItemSelected(selectedItem: ISelectorItem): void {
    if (isEqual(this.inputSelectedItem, selectedItem)) {
      return;
    }

    this.triggerSelectEvent({item: selectedItem});
  }
}

// component definition --------------------------------------------------------
export const SelectorComponent: IComponentOptions = {
  template: require('./selector.html'),
  controller: SelectorController,
  controllerAs: 'vm',
  bindings: {
    inputSelectedItem: '<selected',
    items: '<',
    triggerSelectEvent: '&onSelected'
  }
};

