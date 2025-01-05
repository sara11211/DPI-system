import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// change sidebar component path to change the dashboard 
import { SidebarComponent } from './dashboards/dashboard-administratif/sidebar/sidebar.component';
import { SidebarComponentMedecin } from './dashboards/dashboard-medecin/sidebar/sidebar.component';
import { SidebarPatientComponent } from './dashboards/dashboard-patient/sidebar/sidebar.component';
import { SidebarRadioComponent } from './dashboards/dashboard-Radiologue/sidebar/sidebar.component';
import { SidebarLaboComponent } from './dashboards/dashboard-Laborantin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { TestComponent } from './test/test.component';
import { AuthService } from './login/auth.service';

// import { DashboardRouteService } from './app.routes';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent,SidebarPatientComponent,SidebarRadioComponent,RouterOutlet, LoginComponent, TestComponent],
//   templateUrl: './app.component.html',
// })
// export class AppComponent implements OnInit {
//   title = 'frontend';
//   text = signal('Sauvegarder');
  
//   constructor(private dashboardService: DashboardRouteService) {}
  
//   ngOnInit() {
//     // change userrole here 
//     const userRole = 'radio'; 
//     this.dashboardService.setDashboard(userRole as 'medical' | 'admin' | 'patient'| 'radio' );
//   }
// }


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent,SidebarPatientComponent,SidebarRadioComponent,RouterOutlet, LoginComponent, TestComponent,SidebarComponentMedecin, SidebarLaboComponent],
  templateUrl: './app.component.html',
 
})
export class AppComponent {
  
  constructor(public authService:AuthService) {}

  showSidebarRadio(): boolean {
    return this.authService.getUser()?.fonction === 'Radiologue';
  }

  showSidebarAdmin(): boolean {
    return this.authService.getUser()?.fonction === 'Personnel administratif';
  }

  showSidebarInfirmier(): boolean {
    return this.authService.getUser()?.fonction === 'Infirmier';
  }

  showSidebarMedecin(): boolean {
    return this.authService.getUser()?.fonction === 'Medecin';
  }

  showSidebarLaborantin(): boolean {
    return this.authService.getUser()?.fonction === 'Laborantin';
  }

  showSidebarPatient(): boolean {
    return this.authService.getUser()?.patient;
  }

  
}
