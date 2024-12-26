import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-dossier-nss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-dossier-nss.component.html',
  styleUrls: ['./recherche-dossier-nss.component.css'], // Corrected property name
})
export class RechercheDossierNssComponent {
  nss: string = ''; 
  errorMessage: string | null = null; 

  validateNSS() {
    const isNumeric = /^\d+$/.test(this.nss); // Check if the input contains only numbers
    const hasCorrectLength = this.nss.length === 12; // Check if the input length is 12 digits

    if (!isNumeric) {
      this.errorMessage = 'Veuillez entrer uniquement des chiffres.';
    } else if (!hasCorrectLength) {
      this.errorMessage = 'Le NSS doit contenir exactement 12 chiffres.';
    } else {
      this.errorMessage = null;
    }
  }

  searchNSS() {
    if (!this.nss) {
      this.errorMessage = 'Le champ NSS ne peut pas être vide.';
      return;
    }

    if (!/^\d+$/.test(this.nss)) {
      this.errorMessage = 'Veuillez entrer uniquement des chiffres.';
      return;
    }

    if (this.nss.length !== 12) {
      this.errorMessage = 'Le NSS doit contenir exactement 12 chiffres.';
      return;
    }

    this.errorMessage = null; 
    console.log('Recherche NSS:', this.nss);
  }
}
