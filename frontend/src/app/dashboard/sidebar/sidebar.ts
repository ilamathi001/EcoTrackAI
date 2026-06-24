import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector: 'app-sidebar',
standalone: true,
imports: [CommonModule],
templateUrl: './sidebar.html',
styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

isOpen = false;

constructor(
private router: Router
) {}

toggleSidebar(): void {

this.isOpen = !this.isOpen;


}

closeSidebar(): void {


this.isOpen = false;


}

goToDashboard(): void {


this.router.navigate(
  ['/dashboard']
);

this.closeSidebar();

}

goToProfile(): void {

this.router.navigate(
  ['/profile']
);

this.closeSidebar();


}

goToHistory(): void {


this.router.navigate(
  ['/history']
);

this.closeSidebar();


}

goToRecommendations(): void {

this.router.navigate(
  ['/recommendations']
);

this.closeSidebar();


}

logout(): void {


localStorage.clear();

this.router.navigate(
  ['/login']
);

this.closeSidebar();


}
}
