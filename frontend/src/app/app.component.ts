import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { SidebarComponent } from './dashboards/dashboard-medecin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DashboardRouteService } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    LoginComponent,
    TestComponent,
  ],
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnInit {
  title = 'frontend';
  text = signal('Sauvegarder');

  constructor(private dashboardService: DashboardRouteService) {}

  ngOnInit() {
    // change userrole here 
    const userRole = 'medical';
    this.dashboardService.setDashboard(userRole as 'medical' | 'admin');
  }
}
