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
export class RechercheDossierQrLaboComponent {
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
        name: 'Braham Imad', // Replace with real data after decoding QR
        nss: '0700934666004', // Replace with real data after decoding QR
      };
    }, 1000); // Mock delay
  }

  // Navigate to Historique des Bilans
  viewDossier() {
    if (this.dossier) {
      this.router.navigate(['/historique-bilans'], {
        state: {
          nss: this.dossier.nss,
          nomComplet: this.dossier.name, // Send name as 'nomComplet'
        },
      });
    }
  }
}
