import {cloneDeep} from 'lodash';

// todo: add types
class SelectorController {
  // bindings
  selected: any;
  items: any[];
  onSelected: any;

  constructor(private $scope: ng.IScope) {
    'ngInject';

    this.initSelected();
    this.initItems();
  }

  onItemSelected(item: any) {
    this.onSelected({item});
  }

  private initSelected() {
    this.selected = cloneDeep(this.selected);
    this.$scope.$watch('vm.selected', this.onItemSelected.bind(this));
  }

  private initItems() {
    this.items = cloneDeep(this.items);
  }
}

export const SelectorComponent = {
  templateUrl: 'app/components/selector/selector.html',
  controller: SelectorController,
  controllerAs: 'vm',
  bindings: {
    selected: '<',
    items: '<',
    onSelected: '&'
  }
};

