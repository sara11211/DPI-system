import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentForm: 'chooseProfile' | 'patientForm' | 'personnelForm' = 'chooseProfile';
  selectedProfile: 'patient' | 'personnel' | null = null;
  patientForm!: FormGroup; 
  personnelForm!: FormGroup;
  submitted = false; 

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      nss: ['', [Validators.required, Validators.pattern(/^[0-9]{18}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.personnelForm = this.fb.group({
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  selectPatient() {
    this.selectedProfile = 'patient';
  }

  selectPersonnel() {
    this.selectedProfile = 'personnel';
  }

  goToNextForm() {
    if (this.selectedProfile === 'patient') {
      this.currentForm = 'patientForm';
    } else if (this.selectedProfile === 'personnel') {
      this.currentForm = 'personnelForm';
    }
  }

  goBackToProfileChoice() {
    this.currentForm = 'chooseProfile';
    this.selectedProfile = null;
    this.submitted = false; 
    this.patientForm.reset(); 
  }


  onSubmitPatient() {
    this.submitted = true;

    if (this.currentForm === 'patientForm') {
      if (this.patientForm.invalid) {
        return;
      }
    } 

    console.log(this.patientForm.value); 
    this.goBackToProfileChoice();
  }

  onSubmitPersonnel() {
    this.submitted = true;
  
    if (this.personnelForm.invalid) {
      return;
    }
  
    console.log(this.personnelForm.value);
    this.goBackToProfileChoice();
  }
}