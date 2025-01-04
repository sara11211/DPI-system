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
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currentForm: 'chooseProfile' | 'patientForm' | 'personnelForm' = 'chooseProfile';
  selectedProfile: 'patient' | 'personnel' | null = null;
  patientForm!: FormGroup; 
  personnelForm!: FormGroup;
  submitted = false; 
  errorMessage: string | null = null;

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

    this.authService.login(nss, password).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Login successful:', response);
          localStorage.setItem('user', JSON.stringify(response));
          
          if(response.patient)
          {
            console.log("je suis un patient");
            this.router.navigate(['patient/dashboard']);
          }else{
            //this case must not be present or else I'll shot myself
          }

        } else {
          console.log('Login failed: ' + response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        this.errorMessage = error.error.detail;
        console.log(this.errorMessage);
      },
    });
  }

  onSubmitPersonnel() {
    this.submitted = true;
  
    if (this.personnelForm.invalid) {
      return;
    }
  // Extract form values
  const { username, password} = this.personnelForm.value;
    
  // Make the login request
  this.authService.login(username, password).subscribe({
    next: (response) => {
      if (response.status === 'success') {
        let path;
        console.log('Login successful:', response);
        localStorage.setItem('user', JSON.stringify(response)); // Save user data
        switch (response.fonction) {
          case 'Infirmier':
            path = 'infirmier'
            break;
            
          case 'Medecin':
            path='medecin'     
          break;

          case 'Radiologue':
            path='radiologue'
          break;

          case 'Laborantin':
           path = 'laborantin'
          break;

          case 'Personnel administratif':
            path='admin'
          break;

          default:
            // this.router.navigate(['login']);
            console.log("no fonction found");
        }
        let route = path+'/dashboard'
        this.router.navigate([route]);
      } else {
        console.log('Login failed: ' + response.message); // Adjust based on your backend response
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Login error:', error);
      this.errorMessage = error.error.detail;
      console.log(this.errorMessage);
    },
  });
}

clearErrorMessage() {
  this.errorMessage = null; // Clear the error message when the user starts typing
}

}