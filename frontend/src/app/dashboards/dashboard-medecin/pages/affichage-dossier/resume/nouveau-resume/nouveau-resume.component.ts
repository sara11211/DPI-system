import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nouveau-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-resume.component.html',
  styleUrl: './nouveau-resume.component.css'
})
export class NouveauResumeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 

  symptoms: string = '';
  diagnostic: string = '';
  measuresInfo: string = '';
  nextConsultation: string | null = null;

  // Validation method for the form
  validateForm(): boolean {
    return (
      this.symptoms.trim() !== '' &&
      this.diagnostic.trim() !== '' &&
      this.measuresInfo.trim() !== '' &&
      !!this.nextConsultation
    );
  }

  // Submit handler
  onSubmit(): void {
    if (this.validateForm()) {
      // Form submission logic
      console.log('Form submitted with the following data:');
      console.log({
        symptoms: this.symptoms,
        diagnostic: this.diagnostic,
        measuresInfo: this.measuresInfo,
        nextConsultation: this.nextConsultation,
      });
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    }
  }
}