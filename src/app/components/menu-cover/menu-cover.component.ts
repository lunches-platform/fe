import {IComponentOptions} from 'angular';

import {IMenu, MenuService} from '../../models/menu';

export class MenuCoverController {
  // bindings ------------------------------------------------------------------
  // input
  menu: IMenu;
  private coverIndex: number;

  constructor(private lMenuService: MenuService) {
    'ngInject';

    this.initCover();
  }

  url(): string {
    return this.lMenuService.getCoverOf(this.menu, this.coverIndex);
  }

  switchToNext(): void {
    const nextCoverIndex = this.coverIndex + 1;
    if (nextCoverIndex < this.menu.products.length) {
      this.coverIndex = this.coverIndex + 1;
    } else {
      this.coverIndex = 0;
    }
  }

  private initCover(): void {
    this.coverIndex = 0;
  }
}

// component definition --------------------------------------------------------
export const MenuCoverComponent: IComponentOptions = {
  template: require('./menu-cover.html'),
  controller: MenuCoverController,
  controllerAs: 'vm',
  bindings: {
    menu: '<'
  }
};
