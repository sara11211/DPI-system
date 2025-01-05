import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationService } from './consultation.service';

@Component({
  selector: 'app-nouvelle-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nouvelle-consultation.component.html',
  styleUrls: ['./nouvelle-consultation.component.css'],
})
export class NouvelleConsultationComponent {
  consultationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consultationService: ConsultationService
  ) {
    this.consultationForm = this.fb.group({
      dateConsultation: ['', Validators.required],
      nomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      prenomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    });
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      console.log('Form Data:', this.consultationForm.value);

      const consultationData = this.consultationForm.value;
      this.consultationService.createConsultation(consultationData).subscribe({
        next: () => {
          // Afficher une alerte de succès lorsque la consultation est créée
          window.alert('Consultation créée avec succès!');
          const nss = this.consultationForm.value.nss;
          this.router.navigate([`/recherche-dossier/${nss}/consultations`]);
        },
        error: (err) => {
          // Si vous voulez afficher un message d'erreur générique en cas de problème
          window.alert('❌ Une erreur est survenue lors de la création de la consultation.');
        }
      });
    } else {
      console.log('Form Invalid');
    }
  }
}
