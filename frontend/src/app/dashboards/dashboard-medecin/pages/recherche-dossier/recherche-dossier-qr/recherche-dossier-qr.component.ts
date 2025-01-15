import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-dossier-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recherche-dossier-qr.component.html',
  styleUrl: './recherche-dossier-qr.component.css',
})
export class RechercheDossierQrComponent {
  dossierFound = false;
  dossier: any = null;

  // Handle QR code import
  handleQRImport(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Simulate QR code processing
      this.searchQR(file);
    }
  }

  // Simulate searching with the QR code file
  searchQR(file: File): void {
    // Here you would integrate your backend API for processing the QR code
    // Simulate successful dossier retrieval
    setTimeout(() => {
      this.dossierFound = true;
      this.dossier = {
        name: 'Braham Imad',
        nss: '0700934666004',
      };
    }, 1000);
  }

  constructor(private router: Router) {}
  viewDossier() {
    this.router.navigate(['medein/recherche-dossier', this.dossier.nss]);
  }
}
