import {Component, Input} from '@angular/core';

@Component({
  selector: 'l-menu-cover',
  styles: [`
    .l-menu-cover__image {
      width: 100%;
      height: auto;
    }
  `],
  template: `
    <div class="l-menu-cover">
      <img *ngIf="url" [src]="url" class="md-card-image l-menu-cover__image">
    </div>
  `
})
export class MenuCoverComponent {
  @Input() url: string;
}
