import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet, Routes } from '@angular/router';
import { InformationsPersonellesComponent } from './informations-personelles/informations-personelles.component';
import { ConsultationsComponent } from './consultations/consultations.component';

interface Dossier {
  nom: string;
  nss: string;
  dateAjout: string;
}

@Component({
  selector: 'app-liste-dossiers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './affichage-dossier.component.html',
})
export class AffichageDossierComponent implements OnInit {
  
  activeTab: string = 'personal-info';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([`./${tab}/`], { relativeTo: this.route });
}

  nss: string | null = null;

  constructor(public router: Router,public  route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the NSS parameter from the route
    this.nss = this.route.snapshot.paramMap.get('nss');
  }

}