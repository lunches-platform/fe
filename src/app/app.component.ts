import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'l-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(router: Router) {
    router.initialNavigation();
  }
}
