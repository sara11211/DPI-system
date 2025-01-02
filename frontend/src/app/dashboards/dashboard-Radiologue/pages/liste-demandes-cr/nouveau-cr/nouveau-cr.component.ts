import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nouveau-cr',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nouveau-cr.component.html',
  styleUrls: ['./nouveau-cr.component.css'],
})
export class NouveauCrComponent implements OnInit {
  nss: string | null = null;
  typeExamen: string | null = null;
  synthese: string | null = null;
  dateExamen: string = '';
  resultat: string = '';
  files: File[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.nss = this.route.snapshot.paramMap.get('nss');
    this.typeExamen = this.route.snapshot.paramMap.get('typeExamen');
    this.synthese = this.route.snapshot.paramMap.get('synthese');
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }

  validateForm(): boolean {
    return (
      this.dateExamen.trim() !== '' &&
      this.resultat.trim() !== '' &&
      this.files.length > 0
    );
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Form submitted:', {
        nss: this.nss,
        typeExamen: this.typeExamen,
        synthese: this.synthese,
        dateExamen: this.dateExamen,
        resultat: this.resultat,
        files: this.files.map(file => file.name),
      });

      alert('Compte Rendu sauvegardé avec succès !');
      this.router.navigate(['/liste-demandes-cr']);
    } else {
      console.log('Form validation failed.');
    }
  }

  goBack(): void {
    this.router.navigate(['/liste-demandes-cr']);
  }
}
