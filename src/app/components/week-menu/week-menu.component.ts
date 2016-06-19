import {DayMenu} from '../day-menu/day-menu.service';
import {WeekMenuService} from './week-menu.service';

class WeekMenuController {
  // menus: DayMenu[];
  menus;

  constructor(private weekMenuService: WeekMenuService) {
    'ngInject';

    this.fetchData();
  }

  private fetchData() {
    this.weekMenuService.fetchAll()
      // .then((menus: DayMenu[]) => {
      .then((menus) => {
        this.menus = menus;
      })
    ;
  }
}

export const WeekMenuComponent = {
  templateUrl: 'app/components/week-menu/week-menu.html',
  controller: WeekMenuController,
  controllerAs: 'vm',
  bindings: {
    menu: '<'
  }
};
