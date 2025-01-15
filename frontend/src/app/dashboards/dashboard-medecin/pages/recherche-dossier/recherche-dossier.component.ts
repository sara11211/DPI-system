import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-dossier',
  standalone: true,
  imports: [],
  templateUrl: './recherche-dossier.component.html',
  styleUrl: './recherche-dossier.component.css'
})
export class RechercheDossierComponent {
  selectedOption: string | null = null;

  constructor(private router: Router) {}

  // Set the selected option
  selectOption(option: string) {
    this.selectedOption = option;
  }

  // Navigate based on the selected option
  navigateToSelection() {
    if (this.selectedOption === 'nss') {
      this.router.navigate(['medecin/recherche-dossier/nss']);
    } else if (this.selectedOption === 'qr') {
      this.router.navigate(['medecin/recherche-dossier/qr']);
    } else {
      alert('Veuillez sélectionner une option.');
    }
  }
}
