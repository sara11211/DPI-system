import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../resume.service';  // Assurez-vous d'importer le service
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel

@Component({
  selector: 'app-affichage-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importer FormsModule ici
  templateUrl: './affichage-resume.component.html',
  styleUrls: ['./affichage-resume.component.css']
})
export class AffichageResumeComponent implements OnInit {
  consultationId: number | null = null;
  resumeConsultation: any = null;
  diagnostic: string = '';
  symptoms: string = '';  // Ajouter la propriété pour symptômes
  measuresInfo: string = '';
  nextConsultation: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    
    // Vérification si l'ID de la consultation est valide
    if (consultationId && !isNaN(+consultationId)) {
      this.consultationId = +consultationId;  // Convertir l'ID en nombre

      // Appeler le service pour récupérer le résumé de la consultation
      this.resumeService.getResumeConsultationByConsultationId(this.consultationId).subscribe(
        (data) => {
          // Mapping des données reçues de l'API vers les propriétés du composant
          this.diagnostic = data.diagnostic;
          this.symptoms = data.symptomes;  // Mappage des symptômes
          this.measuresInfo = data.mesure;
          this.nextConsultation = data.date_prochaine_consultation;
        },
        (error) => {
          // Affichage d'une erreur dans la console si la récupération échoue
          console.error('Erreur lors de la récupération du résumé de consultation:', error);
        }
      );
    } else {
      console.error('ID de consultation invalide ou manquant');
    }
  }

  // Fonction pour naviguer vers la page des consultations
  navigateToConsultations(): void {
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}
