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
  styleUrls: ['./recherche-dossier-qr.component.css'], // Fixed styleUrls
})
export class RechercheDossierQrLaboComponent {
 /* dossierFound = false;
  dossier: any = null;

  constructor(private router: Router) {}

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
*/
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
