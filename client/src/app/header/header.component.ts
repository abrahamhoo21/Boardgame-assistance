import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  pageTitle: string = 'Boardgame Assistance App Title'; // Default title
  iconClass: string = 'bi-joystick'; // Default icon
  isSidebarVisible: boolean = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  updateTitle(): void {
    const currentRoute = this.router.url; // Get the current route URL
    switch (currentRoute) {
      case '/text-scanner':
        this.pageTitle = 'Text Scanner';
        this.iconClass = 'bi-camera';
        break;
      case '/scorekeeping':
        this.pageTitle = 'Scorekeeping';
        this.iconClass = 'bi-clipboard-data';
        break;
      case '/chatbot':
        this.pageTitle = 'Chatbot';
        this.iconClass = 'bi-chat-dots';
        break;
      default:
        this.pageTitle = 'Boardgame Assistant'; 
        this.iconClass = 'bi-joystick';
        break;
    }
  }

  // Toggle the sidebar visibility
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    // Emit this state to parent if needed
  }
  onProfileClick(): void {
    console.log('Profile icon clicked');
  }
}
