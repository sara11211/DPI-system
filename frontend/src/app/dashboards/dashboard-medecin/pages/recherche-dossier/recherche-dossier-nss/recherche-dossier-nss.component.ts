import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  dossiers = [
    { name: 'Braham Imad', nss: '070093466600', details: 'Dossier details here' },
    { name: 'Sarah Ahmed', nss: '123456789012', details: 'Another dossier details here' },
  ];

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

    // Simulate backend search
    const dossier = this.dossiers.find((d) => d.nss === this.nss);

    if (dossier) {
      this.dossier = dossier;
      this.dossierFound = true;
    } else {
      this.dossierFound = false;
      this.errorMessage = 'Aucun dossier trouvé pour ce NSS.';
    }
  }
}
