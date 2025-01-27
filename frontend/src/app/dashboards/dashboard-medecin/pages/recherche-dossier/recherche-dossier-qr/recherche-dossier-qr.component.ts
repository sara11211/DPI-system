/*import { CommonModule } from '@angular/common';
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
    const path = `/medecin/recherche-dossier/${this.dossier.nss}/personal-info`;
  }
}
*/


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jsQR from 'jsqr'; 

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
  errorMessage: string | null = null;

  readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private router: Router, private http: HttpClient) {}

  handleQRImport(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.readQRCode(file);
    }
  }

  readQRCode(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          this.errorMessage = 'Failed to create canvas context.';
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        const imageData = context.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (qrCode) {
          const nss = qrCode.data; 
          this.fetchDossierData(nss); 
        } else {
          this.errorMessage = 'No QR code found in the uploaded image.';
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  fetchDossierData(nss: string): void {
    const endpointWithParam = `${this.endpointGetDossierNSS}${nss}/`;

    this.http.get<any>(endpointWithParam, this.httpOptions).subscribe({
      next: (data) => {
        this.dossierFound = true;
        this.dossier = Array.isArray(data) ? data[0] : data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch dossier data.';
        console.error('Error fetching dossier data:', error);
      },
    });
  }

  // Navigate to the dossier details page
  viewDossier(): void {
    if (this.dossier && this.dossier.nss) {
      const path = `/medecin/recherche-dossier/${this.dossier.nss}/personal-info`;
      this.router.navigateByUrl(path);
    } else {
      this.errorMessage = 'No dossier available to view.';
    }
  }
}