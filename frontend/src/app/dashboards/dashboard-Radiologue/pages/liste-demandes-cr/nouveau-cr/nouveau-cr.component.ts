import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../services/api.service';
import { ImageService } from '../../../../../services/image.service';

interface Demande {
  id: string;
  nss?: string;
  type_radiologie: string;
  synthese_bilan_radio?: string; // Optional synthesis property
  date_radiologie?: string; // Date when the report is completed
  resultat?: string; // Completed report result
  image_url?: string; // List of uploaded images
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
    id: '',
    nss: '',
    type_radiologie: '',
    synthese_bilan_radio: '', // Optional synthesis property
    date_radiologie: '', // Date when the report is completed
    resultat: '', // Completed report result
    image_url: '', // List of uploaded images
    consultations: '',
  };

  date_radiologie: string = '';
  resultat: string = '';
  base64Image: string = '';
  


  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiService,private imageService: ImageService) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['demande']) {
      // Retrieve from navigation state
      this.demande = navigation.extras.state['demande'];
    } else {
      // Fallback to query parameters
      this.route.queryParams.subscribe((params) => {
        this.demande = {
          id: params['id'],
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result.toString();
          this.demande.image_url = this.base64Image;
          // console.log('Base64 Image:', this.base64Image);
        }
      };
  
      reader.onerror = () => {
        console.error('Error reading file');
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  validateForm(): boolean {
    return (
      this.date_radiologie.trim() !== '' &&
      this.resultat.trim() !== '' &&
      this.base64Image.length > 0
    );
  }

    onSubmit(): void {
    if (this.validateForm()) {
        this.demande.date_radiologie = this.date_radiologie,
        this.demande.resultat = this.resultat,
        this.demande.image_url = this.base64Image,
        delete this.demande.nss;
        delete this.demande.consultations;
        let data = JSON.stringify(this.demande);  
        console.log(data);
      this.apiService.updateBilanRadio(Number(this.demande?.id), data).subscribe({
        next: (response) => {
          alert('Compte Rendu sauvegardé avec succès !');
          this.router.navigate(['/radiologue/liste-demandes-cr']);
        },
        error: (error) => {
          alert('Une erreur s\'est produite.');
        }
      });
    } else {
      console.log('Form validation failed.');
    }
  }
  


  goBack(): void {
    this.router.navigate(['/radiologue/liste-demandes-cr']);
  }
}
