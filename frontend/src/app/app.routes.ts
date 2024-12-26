import { Routes } from '@angular/router';
import { NouveauDossierComponent } from './dashboards/dashboard-medecin/pages/nouveau-dossier/nouveau-dossier.component';
import { RechercheDossierComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier.component';
import { ListeDossiersComponent } from './dashboards/dashboard-medecin/pages/liste-dossiers/liste-dossiers.component';
import { DashboardComponent } from './dashboards/dashboard-medecin/pages/dashboard/dashboard.component';
import { RechercheDossierNssComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-nss/recherche-dossier-nss.component';
import { RechercheDossierQrComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-qr/recherche-dossier-qr.component';


export const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'nouveau-dossier', component: NouveauDossierComponent },
  // { path: 'recherche-dossier', component: RechercheDossierComponent },
  // { path: 'liste-dossiers', component: ListeDossiersComponent },
  // { path: 'modifier-dossier/:nss', component: ModifierDossierComponent, },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'liste-dossiers', component: ListeDossiersComponent },
  { path: 'recherche-dossier/nss', component: RechercheDossierNssComponent }, 
  { path: 'recherche-dossier/qr', component: RechercheDossierQrComponent },   
  // { path: 'modifier-dossier/:nss', component: ModifierDossierComponent, },
];
