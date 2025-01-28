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
export class RechercheDossierNssLaboComponent {
  /*nss: string = '';
  errorMessage: string | null = null;
  dossierFound: boolean = false;
  dossier: any = null;

  // Example dossier data for testing
  dossiers = [
    {
      name: 'Braham Imad',
      nss: '070093466600',
    },
    {
      name: 'Sarah Ahmed',
      nss: '123456789012',
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
*/
nss: string = '';
errorMessage: string | null = null;
dossierFound: boolean = false;
dossier: any = null;


validateNSS() {
  const isValid = /^\d+$/.test(this.nss) && this.nss.length === 12;
  this.errorMessage = isValid ? null : 'Le NSS doit contenir uniquement 12 chiffres.';
}

  constructor(private router: Router) {}
  readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/';
  async searchNSS() {
    if (!this.nss) {
      this.errorMessage = 'Le champ NSS ne peut pas être vide.';
      return;
    }
    this.errorMessage = '';

    try {
      const response = await fetch(`${this.endpointGetDossierNSS}${this.nss}/`);

      if (!response.ok) {
        this.dossierFound = false;
        this.errorMessage = 'Aucun dossier trouvé pour ce NSS.';
        return;
      }

      this.dossier = await response.json();
      console.log(this.dossier)

      this.dossierFound = true;
    } catch (error) {
      this.dossierFound = false;
      this.errorMessage = 'Une erreur est survenue lors de la recherche du dossier.';
      console.error('Error fetching dossier:', error);
    }
  }
  viewDossier() {
    if (this.dossier) {
      this.router.navigate(['/historique-bilans'], {
        state: {
          nss: this.dossier.nss,
          nomComplet: this.dossier.name, // Map `name` to `nomComplet`
        },
      });
    }
  }
}
