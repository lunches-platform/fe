import { Component } from '@angular/core';

@Component({
  selector: 'l-flash-message',
  styles: [`
    :host {
      color: red
    }
  `],
  template: `
    <div class="md-body-2 layout-row layout-padding layout-align-center-center">
      <ng-content></ng-content>
    </div>
  `
})
export class FlashMessageComponent {
}
