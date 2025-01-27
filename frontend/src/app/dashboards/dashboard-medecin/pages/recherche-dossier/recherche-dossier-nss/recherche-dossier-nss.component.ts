import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recherche-dossier-nss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-dossier-nss.component.html',
  styleUrls: ['./recherche-dossier-nss.component.css']
})
export class RechercheDossierNssComponent {
  nss: string = '';
  errorMessage: string | null = null;
  dossierFound: boolean = false;
  dossier: any = null;

  // Example dossier data for testing
  /*
  dossiers = [
    { name: 'Braham Imad', nss: '070093466600', details: 'Dossier details here' },
    { name: 'Sarah Ahmed', nss: '123456789012', details: 'Another dossier details here' },
  ];
*/
  validateNSS() {
    const isValid = /^\d+$/.test(this.nss) && this.nss.length === 12;
    this.errorMessage = isValid ? null : 'Le NSS doit contenir uniquement 12 chiffres.';
  }

  /*
  readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/';
  async searchNSS() {
    // Check if NSS field is empty
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
  
      // Parse the JSON response
      const data = await response.json();
  
      // Update the dossier with the response data
      this.dossier = data;
      this.dossierFound = true;
      this.dossiers.push(data);
    } catch (error) {
      // Handle network or other errors
      this.dossierFound = false;
      this.errorMessage = 'Une erreur est survenue lors de la recherche du dossier.';
      console.error('Error fetching dossier:', error);
    }
  }
  readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/';

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
    } else {
      this.dossierFound = false;
      this.errorMessage = 'Aucun dossier trouvé pour ce NSS.';
    }
  }

  constructor(private router: Router) {}
  viewDossier() {
    this.router.navigate(['medecin/recherche-dossier', this.dossier.nss]);
  }*/

    constructor(private router: Router) {}
    readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/';
    async searchNSS() {
      // Check if NSS field is empty
      if (!this.nss) {
        this.errorMessage = 'Le champ NSS ne peut pas être vide.';
        return;
      }
  
      // Clear any previous error message
      this.errorMessage = '';
  
      try {
        // Fetch the dossier from the API endpoint
        const response = await fetch(`${this.endpointGetDossierNSS}${this.nss}/`);
  
        if (!response.ok) {
          // Handle cases where the response is not OK
          this.dossierFound = false;
          this.errorMessage = 'Aucun dossier trouvé pour ce NSS.';
          return;
        }
  
        // Parse the JSON response
        this.dossier = await response.json();
        console.log(this.dossier)
  
        // Indicate the dossier was found
        this.dossierFound = true;
      } catch (error) {
        // Handle network or other errors
        this.dossierFound = false;
        this.errorMessage = 'Une erreur est survenue lors de la recherche du dossier.';
        console.error('Error fetching dossier:', error);
      }
    }
  
    viewDossier() {
      if (this.dossier && this.dossier.nss) {
        const path = `/medecin/recherche-dossier/${this.dossier.nss}/personal-info`;
        this.router.navigate([path]);
      }
    }
}
