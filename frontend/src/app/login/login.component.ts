import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.patientForm = this.fb.group({
      nss: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.personnelForm = this.fb.group({
      fonction: ['', [Validators.required]],
      username: ['', [Validators.required]],
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
        console.error('Form is invalid:', this.patientForm.errors);
        return;
      }
      
    } 

    // Extract form values
    const { nss, password } = this.patientForm.value;
    
    // Make the login request
    this.authService.login(nss, password).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Login successful:', response);
          localStorage.setItem('user', JSON.stringify(response)); // Save user data
          this.router.navigate(['test']);
          console.log("wechhhhhhh");
        } else {
          console.log('Login failed: ' + response.message); // Adjust based on your backend response
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      },
    });

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