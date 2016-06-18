import {DayMenu} from './day-menu.service';

class DayMenuController {
  menu: DayMenu;

  constructor() {
    'ngInject';
  }
}

export const DayMenuComponent = {
  templateUrl: 'app/components/day-menu/day-menu.html',
  controller: DayMenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<'
  }
};
