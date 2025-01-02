import { Routes } from '@angular/router';
import { NouveauDossierComponent } from './dashboards/dashboard-medecin/pages/nouveau-dossier/nouveau-dossier.component';
import { RechercheDossierComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier.component';
import { AffichageDossierComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/affichage-dossier.component';
import { DashboardComponent } from './dashboards/dashboard-medecin/pages/dashboard/dashboard.component';
import { RechercheDossierNssComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-nss/recherche-dossier-nss.component';
import { RechercheDossierQrComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-qr/recherche-dossier-qr.component';
import { InformationsPersonellesComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/informations-personelles/informations-personelles.component';
import { ConsultationsComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/consultations/consultations.component';
import { NouveauResumeComponent} from './dashboards/dashboard-medecin/pages/affichage-dossier/resume/nouveau-resume/nouveau-resume.component';
import { ListeOrdonnancesComponent } from './dashboards/dashboard-medecin/pages/liste-ordonnances/liste-ordonnances.component';
import { Component } from '@angular/core';
import { DashboardPatientComponent } from './dashboards/dashboard-patient/dashboard-patient.component';
import { InformationsPersonellesPatientComponent } from './dashboards/dashboard-patient/pages/informations-personelles/informations-personelles.component';
import { ModifierDossierComponent } from './dashboards/dashboard-administratif/pages/modifier-dossier/modifier-dossier.component';
import { ModifierInfoComponent } from './dashboards/dashboard-patient/pages/informations-personelles/modifier/modifier.component';

import { NouvelleOrdonnanceComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/ordonnance/nouvelle-ordonnance/nouvelle-ordonnance.component';
import { AffichageOrdonnanceComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/ordonnance/affichage-ordonnance/affichage-ordonnance.component';
import { ResultatBioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-bio/resultat-bio/resultat-bio.component';
import { NouveauBilanBioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-bio/nouveau-bilan-bio/nouveau-bilan-bio.component';
import { AffichageBilanBioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-bio/affichage-bilan-bio/affichage-bilan-bio.component';
import { ResultatRadioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-radio/resultat-radio/resultat-radio.component';
import { NouveauBilanRadioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-radio/nouveau-bilan-radio/nouveau-bilan-radio.component';
import { AffichageBilanRadioComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-radio/affichage-bilan-radio/affichage-bilan-radio.component';
import { AffichageResumeComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/resume/affichage-resume/affichage-resume.component';
import { VisualisationComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-bio/visualisation/visualisation.component';
import { ListeDossiersComponent } from './dashboards/dashboard-administratif/pages/liste-dossiers/liste-dossiers.component';


// Import the radio dashboard component
import { DashboardRadioComponent } from './dashboards/dashboard-Radiologue/pages/dashboard/dashboard.component';
import { RechercheDossierRadioComponent } from './dashboards/dashboard-Radiologue/pages/recherche-dossier/recherche-dossier.component';
import { RechercheDossierNssRadioComponent } from './dashboards/dashboard-Radiologue/pages/recherche-dossier/recherche-dossier-nss/recherche-dossier-nss.component';
import { RechercheDossierQrRadioComponent } from './dashboards/dashboard-Radiologue/pages/recherche-dossier/recherche-dossier-qr/recherche-dossier-qr.component';
import { ListeDemandesCRComponent } from './dashboards/dashboard-Radiologue/pages/liste-demandes-cr/liste-demandes-cr.component';
import { NouveauCrComponent } from './dashboards/dashboard-Radiologue/pages/liste-demandes-cr/nouveau-cr/nouveau-cr.component';
import { CompteRenduComponent } from './dashboards/dashboard-Radiologue/pages/liste-demandes-cr/compte-rendu/compte-rendu.component';


export type DashboardType = 'medical' | 'admin' | 'patient' | 'radio';


export const administratifRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'liste-dossiers', component: ListeDossiersComponent },
  { path: 'modifier-dossier/:nss', component: ModifierDossierComponent, },
]

export const medecinRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'recherche-dossier/nss', component: RechercheDossierNssComponent },
  { path: 'recherche-dossier/qr', component: RechercheDossierQrComponent },
  { path: 'nouvelle-consultation', component: NouvelleConsultationComponent },
  
  {
    path: 'recherche-dossier/:nss',
    component: AffichageDossierComponent,
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
      { path: 'personal-info', component: InformationsPersonellesComponent },
      {
        path: 'consultations',
        component: ConsultationsComponent,
        children: [
          { path: 'nouvelle-ordonnance/:id', component: NouvelleOrdonnanceComponent },
          { path: 'affichage-ordonnance/:id', component: AffichageOrdonnanceComponent },
          { path: 'resultat-bio/:id', component: ResultatBioComponent },
          { path: 'nouveau-bilan-bio/:id', component: NouveauBilanBioComponent },
          { path: 'affichage-bilan-bio/:id', component: AffichageBilanBioComponent },

          { path: 'resultat-radio/:id', component: ResultatRadioComponent },
          { path: 'nouveau-bilan-radio/:id', component: NouveauBilanRadioComponent },
          { path: 'affichage-bilan-radio/:id', component: AffichageBilanRadioComponent },

          { path: 'nouveau-resume/:id', component: NouveauResumeComponent },
          { path: 'affichage-resume/:id', component: AffichageResumeComponent },

          { path: 'visualisation/:id', component: VisualisationComponent },
        ],
      },
    ],
  },
  { path: 'liste-ordonnances', component: ListeOrdonnancesComponent, children:[
    { path: 'affichage-ordonnance/:id', component: AffichageOrdonnanceComponent },
  ] },
];

export const patientRoutes: Routes = [
  { path: 'mes-informations-personnelles', component:InformationsPersonellesPatientComponent,
    children: [
      { path: '', redirectTo: 'mes-informations-personnelles', pathMatch: 'full' },
      {path: 'modifier', component: ModifierInfoComponent},
    ]
  },
  //{ path: 'dashboard/:nss'}, Component: DashboardPatientComponent}

]

// Routes for the radiology dashboard
export const radioRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardRadioComponent },
  { path: 'recherche-dossier', component: RechercheDossierRadioComponent },
  { path: 'recherche-dossier/qr', component: RechercheDossierQrRadioComponent },
  { path: 'recherche-dossier/:nss', component: RechercheDossierNssRadioComponent },
 // { path: 'liste-demandes-cr', component: NouveauBilanRadioComponent }, 
 // { path: 'nouveau-cr/:nss/:typeExamen/:synthese', component: CompteRenduComponent},
   { path: 'liste-demandes-cr', component: ListeDemandesCRComponent},
   { path: 'nouveau-cr/:nss/:typeExamen/:synthese', component: NouveauCrComponent },
   { path: 'compte-rendu/:nss', component: CompteRenduComponent },

];

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NouvelleConsultationComponent } from './dashboards/dashboard-medecin/pages/nouvelle-consultation/nouvelle-consultation.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardRouteService {
  private currentDashboard = new BehaviorSubject<DashboardType>('patient');
  
  constructor(private router: Router) {}
  
  getCurrentDashboard() {
    return this.currentDashboard.asObservable();
  }
  
  setDashboard(type: DashboardType) {
    console.log('Setting dashboard to', type);  // Add this line
    this.currentDashboard.next(type);
    this.updateRoutes();
  }
  
  private updateRoutes() {
    //const routes = this.currentDashboard.value === 'medical' ? medecinRoutes : administratifRoutes;
    let r;
    switch (this.currentDashboard.value){
      default: case 'medical':  r = medecinRoutes; break;
      case 'admin':  r = administratifRoutes; break;
      case 'patient':  r = patientRoutes; break;
      case 'radio':  r = radioRoutes; break;
    }
    const routes=r;
    this.router.resetConfig(routes);
  }
}
//login routes
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
];
