import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class CompteRenduComponent implements OnInit {
  nss: string = '';
  typeExamen: string = '';
  synthese: string = '';
  dateExamen: string = '';
  resultat: string = '';
  uploadedImages: string[] = [];
  isEditable: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location // Inject Location
  ) {}

  ngOnInit(): void {
    // Safely fetch state data passed from ListeDemandesCRComponent
    const state = history.state;

    // Check if data exists, then populate fields
    if (state && state.nss) {
      this.nss = state.nss;
      this.typeExamen = state.typeExamen;
      this.synthese = state.synthese;
      this.dateExamen = state.dateExamen || '';
      this.resultat = state.resultat || '';
      this.uploadedImages = state.uploadedImages || [];
    } else {
      console.error('No data passed to CompteRenduComponent');
    }
  }

  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.uploadedImages.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  goBack(): void {
    this.location.back(); // Use Location service to navigate back
  }

  onSubmit(): void {
    if (this.isEditable) {
      console.log('Saved data:', {
        nss: this.nss,
        typeExamen: this.typeExamen,
        dateExamen: this.dateExamen,
        synthese: this.synthese,
        resultat: this.resultat,
        uploadedImages: this.uploadedImages,
      });
      alert('Modifications sauvegardées avec succès !');
      this.isEditable = false;
    }
  }
}
