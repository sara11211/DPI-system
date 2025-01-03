import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-resume.component.html',
  styleUrl: './modifier-resume.component.css'
})
export class ModifierResumeComponent implements OnInit {
  symptoms: string = '';
  diagnostic: string = '';
  measuresInfo: string = '';
  nextConsultation: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    // Here you would typically load the existing resume data
    // For now, using mock data
    this.symptoms = 'Fièvre, maux de tête';
    this.diagnostic = 'Grippe saisonnière';
    this.measuresInfo = 'Repos et hydratation';
    this.nextConsultation = '2024-01-10';
  }

  validateForm(): boolean {
    return (
      this.symptoms.trim() !== '' &&
      this.diagnostic.trim() !== '' &&
      this.measuresInfo.trim() !== '' &&
      this.nextConsultation !== ''
    );
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Updated resume data:', {
        symptoms: this.symptoms,
        diagnostic: this.diagnostic,
        measuresInfo: this.measuresInfo,
        nextConsultation: this.nextConsultation,
      });
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    }
  }

  annuler(): void {
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}