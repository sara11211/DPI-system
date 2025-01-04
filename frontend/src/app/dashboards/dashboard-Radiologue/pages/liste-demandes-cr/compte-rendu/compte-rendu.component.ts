import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // Import Location
import { CommonModule } from '@angular/common';
import { ImageService } from '../../../../../services/image.service';
import { ApiService } from '../../../../../services/api.service';

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
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class CompteRenduComponent implements OnInit {
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

  nss: string = '';
  typeExamen: string = '';
  synthese: string = '';
  dateExamen: string = '';
  resultat: string = '';
  uploadedImages: string = '';
  isEditable: boolean = false;
  base64Image: string = '';

  constructor(
    private apiService: ApiService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location // Inject Location
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['demande']) {
      // Retrieve from navigation state
    } else {
      // Fallback to query parameters
      this.route.queryParams.subscribe((params) => {
          this.demande.id = params['id'],
          this.demande.type_radiologie = params['type_radiologie'],
          this.demande.synthese_bilan_radio = params['synthese_bilan_radio'],
          this.nss = params['nss'],
          this.typeExamen = params['type_radiologie'],
          this.synthese = params['synthese_bilan_radio'], 
          this.dateExamen = params['date_radiologie'], 
          this.resultat = params['resultat'],
          this.uploadedImages = params['image_url']
      });
    }

    const fileName = this.uploadedImages.split('/').pop()|| "";
    this.imageService.getImage(fileName).subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImages = reader.result as string;
        this.base64Image = this.uploadedImages;
      };
      reader.readAsDataURL(response);
    });
  }

  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result.toString();
          this.uploadedImages = this.base64Image;
          this.demande.image_url = this.uploadedImages;
          // console.log('Base64 Image:', this.base64Image);
        }
      };
  
      reader.onerror = () => {
        console.error('Error reading file');
      };
  
      reader.readAsDataURL(file);
    }
  }

  goBack(): void {
    this.location.back(); // Use Location service to navigate back
  }

  onSubmit(): void {
        this.demande.date_radiologie = this.dateExamen,
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
  }

}
