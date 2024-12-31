import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nouvelle-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nouvelle-consultation.component.html',
  styleUrl: './nouvelle-consultation.component.css'
})
export class NouvelleConsultationComponent {
  consultationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.consultationForm = this.fb.group({
      dateConsultation: ['', Validators.required],
      nomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      prenomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
    });
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      console.log('Form Data:', this.consultationForm.value);
      const nss = this.consultationForm.value.nss;
      this.router.navigate([`/recherche-dossier/${nss}/consultations`]);
    } else {
      console.log('Form Invalid');
    }
  }
}
