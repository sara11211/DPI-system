import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdonnanceService } from '../ordonnance.service';

@Component({
  selector: 'app-nouvelle-ordonnance',
  templateUrl: './nouvelle-ordonnance.component.html',
  styleUrls: ['./nouvelle-ordonnance.component.css']
})
export class NouvelleOrdonnanceComponent {
  consultationId: number; // ID de la consultation
  medications: { name: string; dose: string; duration: string }[] = []; // Liste des médicaments
  formValid: boolean = false; // Validation du formulaire

  constructor(
    private ordonnanceService: OrdonnanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Récupérer l'ID de consultation depuis l'URL
    this.consultationId = Number(this.route.snapshot.paramMap.get('consultationId'));
  }

  // Ajouter un médicament
  addMedication(): void {
    this.medications.push({ name: '', dose: '', duration: '' });
    this.validateForm();
  }

  // Supprimer un médicament
  removeMedication(index: number): void {
    if (this.medications.length > 1) {
      this.medications.splice(index, 1);
      this.validateForm();
    }
  }

  // Valider le formulaire
  validateForm(): void {
    this.formValid = this.medications.every(
      (med) => med.name.trim() && med.dose.trim() && med.duration.trim()
    );
  }

  // Sauvegarder l'ordonnance
  sauvegarder(): void {
    if (this.formValid) {
      const ordonnanceData = { medications: this.medications };

      this.ordonnanceService.createOrdonnance(this.consultationId, ordonnanceData).subscribe({
        next: (response) => {
          const ordonnanceId = response.id; // Récupérer l'ID de l'ordonnance créée
          // Rediriger vers l'URL de l'ordonnance créée
          this.router.navigate([
            `/recherche-dossier/${this.route.snapshot.paramMap.get('dossierId')}/consultations/nouvelle-ordonnance/${ordonnanceId}`
          ]);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'ordonnance :', error);
        }
      });
    }
  }
}
