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
import { NouveauResumeComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/resume/nouveau-resume/nouveau-resume.component';
import { AffichageResumeComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/resume/affichage-resume/affichage-resume.component';
import { VisualisationComponent } from './dashboards/dashboard-medecin/pages/affichage-dossier/bilans-bio/visualisation/visualisation.component';
import { ListeDossiersComponent } from './dashboards/dashboard-administratif/pages/liste-dossiers/liste-dossiers.component';
import { ModifierDossierComponent } from './dashboards/dashboard-administratif/pages/modifier-dossier/modifier-dossier.component';

export type DashboardType = 'medical' | 'admin';


export const administratifRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'liste-dossiers', component: ListeDossiersComponent },
  { path: 'modifier-dossier/:nss', component: ModifierDossierComponent, },
]

export const medecinRoutes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent },
  { path: 'recherche-dossier', component: RechercheDossierComponent },
  { path: 'recherche-dossier/nss', component: RechercheDossierNssComponent },
  { path: 'recherche-dossier/qr', component: RechercheDossierQrComponent },
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
  { path: 'liste-ordonnances', component: ListeOrdonnancesComponent, children:[
    { path: 'affichage-ordonnance/:id', component: AffichageOrdonnanceComponent },
  ] },

  { path: 'mes-informations-personnelles', component:InformationsPersonellesPatientComponent,
    children: [
      { path: '', redirectTo: 'mes-informations-personelles', pathMatch: 'full' },
      {path: 'modifier', component: ModifierInfoComponent},
    ]
  },
  //{ path: 'dashboard/:nss'}, Component: DashboardPatientComponent}

];
