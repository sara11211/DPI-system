import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-nouveau-bilan-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-bilan-radio.component.html',
  styleUrl: './nouveau-bilan-radio.component.css'
})
export class NouveauBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiService) {}

  id : string | null = '';
  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    this.id = this.route.snapshot.paramMap.get('id');
  } 

  // Form data
  typeBilan: string = '';
  synthese: string = '';  

  // Predefined options for "Type Bilan"
  typeBilanOptions: string[] = ['Radiographie', 'Scanner', 'IRM', 'Échographie'];

  // Validation method for the form
  validateForm(): boolean {
    return this.typeBilan.trim() !== '' && this.synthese.trim() !== '';
  }

  // Submit handler
  onSubmit(): void {
    if (this.validateForm()) {
      // Form submission logic
      console.log('Form submitted with the following data:');
      console.log({
        typeBilan: this.typeBilan,
        synthese: this.synthese,
      });

      let data = {
        "type_radiologie" : this.typeBilan,
        "synthese_bilan_radio" : this.synthese,
        "consultations" : this.id,
      }

      this.apiService.postBilanRadio(data).subscribe({
        next: (response) => {
          alert('bilan radiologique sauvegardé avec succès !');
        },
        error: (error) => {
          alert('Une erreur s\'est produite.');
        }
      });

      // Navigate or reset form
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    } else {
      alert('Please fill all fields.');
    }
  }
}