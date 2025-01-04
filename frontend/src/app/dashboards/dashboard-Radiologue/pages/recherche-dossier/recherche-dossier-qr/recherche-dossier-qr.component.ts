import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-dossier-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recherche-dossier-qr.component.html',
  styleUrls: ['./recherche-dossier-qr.component.css'], // Fixed styleUrls
})
export class RechercheDossierQrRadioComponent {
  dossierFound = false;
  dossier: any = null;

  constructor(private router: Router) {}

  // Handle QR code import
  handleQRImport(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.searchQR(file); // Simulate processing QR
    }
  }

  // Simulate searching with the QR code file
  searchQR(file: File): void {
    // Simulating backend API QR code processing
    setTimeout(() => {
      this.dossierFound = true;
      this.dossier = {
        name: 'Braham Imad',
        nss: '0700934666004',
        typeExamen: 'IRM',
        synthese: 'Synthèse du patient...',
        dateExamen: '2023-01-15',
        resultat: 'Résultat de l’examen...',
        uploadedImages: ['path-to-image1.jpg', 'path-to-image2.jpg'],
      };
    }, 1000); // Mock delay
  }

  // Navigate to Compte Rendu
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
