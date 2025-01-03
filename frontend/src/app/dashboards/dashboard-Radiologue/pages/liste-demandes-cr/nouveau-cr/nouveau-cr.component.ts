import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Demande {
  nss: string;
  type_radiologie: string;
  synthese_bilan_radio?: string; // Optional synthesis property
  date_radiologie?: string; // Date when the report is completed
  resultat?: string; // Completed report result
  image_url?: string[]; // List of uploaded images
  consultations?: string;
}

@Component({
  selector: 'app-nouveau-cr',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './nouveau-cr.component.html',
  styleUrls: ['./nouveau-cr.component.css'],
})
export class NouveauCrComponent implements OnInit {
  demande: Demande = { // Initializing with a default object
    nss: '',
    type_radiologie: '',
    synthese_bilan_radio: '', // Optional synthesis property
    date_radiologie: '', // Date when the report is completed
    resultat: '', // Completed report result
    image_url: [''], // List of uploaded images
    consultations: '',
  };

  date_radiologie: string = '';
  resultat: string = '';
  files: File[] = [];
  


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['demande']) {
      // Retrieve from navigation state
      this.demande = navigation.extras.state['demande'];
    } else {
      // Fallback to query parameters
      this.route.queryParams.subscribe((params) => {
        this.demande = {
          nss: params['nss'],
          type_radiologie: params['type_radiologie'],
          synthese_bilan_radio: params['synthese_bilan_radio'], 
          date_radiologie: params['date_radiologie'], 
          resultat: params['resultat'],
          image_url: params['image_url'],
          consultations: params['consultations'],
        };
      });
    }
    console.log('Demande:', this.demande);
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }

  validateForm(): boolean {
    return (
      this.date_radiologie.trim() !== '' &&
      this.resultat.trim() !== '' &&
      this.files.length > 0
    );
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Form submitted:', {
        date_radiologie: this.date_radiologie,
        resultat: this.resultat,
        files: this.files.map(file => file.name),
      });

      alert('Compte Rendu sauvegardé avec succès !');
      this.router.navigate(['/radiologue/liste-demandes-cr']);
    } else {
      console.log('Form validation failed.');
    }
  }

  goBack(): void {
    this.router.navigate(['/radiologue/liste-demandes-cr']);
  }
}
