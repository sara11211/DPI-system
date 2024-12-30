import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// change sidebar component path to change the dashboard 
import { SidebarComponent } from './dashboards/dashboard-medecin/sidebar/sidebar.component';
import { SidebarPatientComponent } from './dashboards/dashboard-patient/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarPatientComponent } from './dashboards/dashboard-patient/sidebar/sidebar.component';
import { DashboardRouteService } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent,SidebarPatientComponent],
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