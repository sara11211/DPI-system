import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../resume.service'; // Assure-toi d'importer le service

@Component({
  selector: 'app-nouveau-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-resume.component.html',
  styleUrls: ['./nouveau-resume.component.css']
})
export class NouveauResumeComponent implements OnInit {
  // Déclaration des variables
  symptoms: string = '';
  diagnostic: string = '';
  measuresInfo: string = '';
  nextConsultation: string | null = null;
  consultationId: number | null = null; // Pour stocker l'ID de la consultation

  constructor(private route: ActivatedRoute, private router: Router, private resumeService: ResumeService) {}

  ngOnInit(): void {
    // Récupérer l'ID de la consultation depuis l'URL (paramètre de la route)
    const consultationId = this.route.snapshot.paramMap.get('id'); 
    if (consultationId) {
      this.consultationId = +consultationId; // Convertir en nombre
    }
  }

  // Validation du formulaire
  validateForm(): boolean {
    return (
      this.symptoms.trim() !== '' &&
      this.diagnostic.trim() !== '' &&
      this.measuresInfo.trim() !== '' &&
      !!this.nextConsultation &&
      this.consultationId !== null  // Vérifie que l'ID de la consultation est bien présent
    );
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.validateForm()) {
      const formData = {
        diagnostic: this.diagnostic,
        symptomes: this.symptoms,
        mesure: this.measuresInfo,
        date_prochaine_consultation: this.nextConsultation,
        consultationId: this.consultationId, // Ajout de l'ID de consultation récupéré de la route
      };

      // Envoie des données via le service
      this.resumeService.createResumeConsultation(formData).subscribe(
        response => {
          console.log('Form submitted successfully:', response);
          // Redirection vers la page des consultations après succès
          this.router.navigate(['../../../consultations'], { relativeTo: this.route });
        },
        error => {
          console.error('Error during form submission:', error);
        }
      );
    }
  }
}
