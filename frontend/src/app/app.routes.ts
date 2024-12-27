import { Routes } from '@angular/router';
import { NouveauDossierComponent } from './dashboards/dashboard-medecin/pages/nouveau-dossier/nouveau-dossier.component';
import { RechercheDossierComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier.component';
import { AffichageDossierComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/affichage-dossier.component';
import { DashboardComponent } from './dashboards/dashboard-medecin/pages/dashboard/dashboard.component';
import { RechercheDossierNssComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-nss/recherche-dossier-nss.component';
import { RechercheDossierQrComponent } from './dashboards/dashboard-medecin/pages/recherche-dossier/recherche-dossier-qr/recherche-dossier-qr.component';
import { InformationsPersonellesComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/informations-personelles/informations-personelles.component';
import { ConsultationsComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/consultations/consultations.component';
import { NouveauResumeComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/nouveau-resume/nouveau-resume.component';
import { ListeOrdonnancesComponent } from './dashboards/dashboard-medecin/pages/liste-ordonnances/liste-ordonnances.component';
import { NouvelleOrdonnanceComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/ordonnance/nouvelle-ordonnance/nouvelle-ordonnance.component';

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
  { path: 'recherche-dossier/nss', component: RechercheDossierNssComponent },
  { path: 'recherche-dossier/qr', component: RechercheDossierQrComponent },
  { path: 'nouvelle-ordonnance/:id', component: NouvelleOrdonnanceComponent },
  
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
          { path: 'nouveau-resume', component: NouveauResumeComponent },
        ],
      },
    ],
  },
  { path: 'liste-ordonnances', component: ListeOrdonnancesComponent },
];
