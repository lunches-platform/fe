import {cloneDeep} from 'lodash';
import {IScope} from 'angular';

export const SelectorComponent = {
  template: require('./selector.html'),
  controller: SelectorController,
  controllerAs: 'vm',
  bindings: {
    selected: '<',
    items: '<',
    triggerSelectEvent: '&onSelected'
  }
};

export class SelectorController {
  // input bindings
  selected: ISelectorItem;
  items: ISelectorItem[];

  // output bindings
  triggerSelectEvent: ITriggerSelectEvent;

  constructor(private $scope: IScope) {
    'ngInject';

    this.initSelected();
    this.initItems();
  }

  onItemSelected(item: ISelectorItem): void {
    this.triggerSelectEvent({item});
  }

  private initSelected(): void {
    this.selected = cloneDeep(this.selected);
    this.$scope.$watch('vm.selected', this.onItemSelected.bind(this));
  }

  private initItems(): void {
    this.items = cloneDeep(this.items);
  }
}

export interface ISelectorItem {
  id: string;
  title: string;
}

interface ITriggerSelectEvent {
  (arg: { item: ISelectorItem }): void;
}

