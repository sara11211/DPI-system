import { Component } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css'
})
export class DashboardPatientComponent{
  constructor(private route: ActivatedRoute, private router: Router) {
  }
    ngOnInit(): void {
      let  nss = this.route.snapshot.paramMap.get('nss');
      if (!nss) {
        nss="0673222612";}
      
    }
  
}
