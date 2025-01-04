import { Routes } from '@angular/router';

import { NouveauDossierComponent } from './dashboards/dashboard-administratif/pages/nouveau-dossier/nouveau-dossier.component';
import { RechercheDossierComponent } from './dashboards/dashboard-administratif/pages/recherche-dossier/recherche-dossier.component';
import { ListeDossiersComponent } from './dashboards/dashboard-administratif/pages/liste-dossiers/liste-dossiers.component';
import { DashboardComponent } from './dashboards/dashboard-administratif/pages/dashboard/dashboard.component';
import { ModifierDossierComponent } from './dashboards/dashboard-administratif/pages/modifier-dossier/modifier-dossier.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'liste-dossiers', component: ListeDossiersComponent },
  { path: 'modifier-dossier/:nss', component: ModifierDossierComponent, },
];
