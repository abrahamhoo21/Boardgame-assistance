import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in <=> out', [animate('300ms ease-in-out')])
    ])
  ]
})
export class SidebarComponent {
  isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  closeSidebar(): void {
    this.isSidebarVisible = false;
  }

  getSidebarState(): string {
    //in (visible) and out (hidden).
    return this.isSidebarVisible ? 'in' : 'out';
  }
}
