import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-dossier-nss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-dossier-nss.component.html',
  styleUrls: ['./recherche-dossier-nss.component.css'],
})
export class RechercheDossierNssRadioComponent {
  nss: string = '';
  errorMessage: string | null = null;
  dossierFound: boolean = false;
  dossier: any = null;

  // Example dossier data for testing
  dossiers = [
    {
      name: 'Braham Imad',
      nss: '070093466600',
      typeExamen: 'IRM',
      synthese: 'Synthèse du patient...',
      dateExamen: '2023-01-15',
      resultat: 'Résultat de l’examen...',
      uploadedImages: ['path-to-image1.jpg', 'path-to-image2.jpg'],
    },
    {
      name: 'Sarah Ahmed',
      nss: '123456789012',
      typeExamen: 'Radiographie',
      synthese: 'Synthèse pour Sarah Ahmed...',
      dateExamen: '2023-02-20',
      resultat: 'Résultat pour Sarah Ahmed...',
      uploadedImages: ['path-to-image3.jpg'],
    },
  ];

  constructor(private router: Router) {}

  validateNSS() {
    const isValid = /^\d+$/.test(this.nss) && this.nss.length === 12;
    this.errorMessage = isValid ? null : 'Le NSS doit contenir uniquement 12 chiffres.';
  }

  searchNSS() {
    if (!this.nss) {
      this.errorMessage = 'Le champ NSS ne peut pas être vide.';
      return;
    }

    if (this.errorMessage) {
      return;
    }

    const dossier = this.dossiers.find((d) => d.nss === this.nss);

    if (dossier) {
      this.dossier = dossier;
      this.dossierFound = true;
      this.errorMessage = null; // Clear any previous errors
    } else {
      this.dossierFound = false;
      this.errorMessage = 'Aucun dossier trouvé pour ce NSS.';
    }
  }

  viewDossier() {
    if (this.dossier) {
      this.router.navigate(['/compte-rendu', this.dossier.nss], {
        state: {
          nss: this.dossier.nss,
          typeExamen: this.dossier.typeExamen,
          synthese: this.dossier.synthese,
          dateExamen: this.dossier.dateExamen,
          resultat: this.dossier.resultat,
          uploadedImages: this.dossier.uploadedImages,
        },
      });
    }
  }
}
