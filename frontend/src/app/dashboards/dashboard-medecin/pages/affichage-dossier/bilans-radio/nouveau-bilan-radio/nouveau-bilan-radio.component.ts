import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nouveau-bilan-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-bilan-radio.component.html',
  styleUrl: './nouveau-bilan-radio.component.css'
})
export class NouveauBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
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

      // Navigate or reset form
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    } else {
      alert('Please fill all fields.');
    }
  }
}