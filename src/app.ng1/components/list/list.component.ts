import { IComponentOptions } from 'angular';

export const ListComponent: IComponentOptions = {
  template: `
    <md-list ng-class="{{ vm.containerClass.split(' ') }}" ng-if="vm.items">
      <md-list-item
        ng-repeat="item in vm.items track by item.title"
        ng-class="{{ vm.itemClass.split(' ') }}"
        ng-click="item.onClick(item)"
      >
        <md-icon nf-if="item.icon" ariaLabel="{{ item.ariaLabel }}">{{ item.icon }}</md-icon>
        <p>{{ item.title }}</p>
      </md-list-item>
    </md-list>
  `,
  controllerAs: 'vm',
  bindings: {
    containerClass: '@',
    itemClass: '@',
    items: '<'
  }
};
