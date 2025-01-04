import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeSoin } from '../../../dashboard-patient/dashboard-patient.component';

const allowedTypeSoins: TypeSoin[] = [
  'Administration de medicaments',
  'Changement de pensements',
  'Mesures de Parametres Medicaux',
];
export function typeSoinValidator(allowedTypeSoins: TypeSoin[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = allowedTypeSoins.includes(control.value);
    return isValid ? null : { invalidTypeSoin: { value: control.value } };
  };
}

@Component({
  selector: 'app-nouveau-soin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nouveau-soin.component.html',
  styleUrl: './nouveau-soin.component.css'
})
export class NouveauSoinComponent {

   soinForm: FormGroup;
  
    constructor(private fb: FormBuilder, private router: Router) {
      this.soinForm = this.fb.group({
        dateSoin: ['', Validators.required],
        heureSoin: ['', Validators.required],
        typeSoin:['', Validators.required , typeSoinValidator(allowedTypeSoins)],
        nomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        prenomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        nss: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
        description: ['', Validators.required],
      });
    }

    isDropdownOpen = false;
    selectedOption='';
    options=allowedTypeSoins;
  
    onSubmit() {
      if (this.soinForm.valid) {
        console.log('Form Data:', this.soinForm.value);
        const nss = this.soinForm.value.nss;
        this.router.navigate([`/recherche-dossier/${nss}/consultations`]);
      } else {
        console.log('Form Invalid');
      }
    }


}
