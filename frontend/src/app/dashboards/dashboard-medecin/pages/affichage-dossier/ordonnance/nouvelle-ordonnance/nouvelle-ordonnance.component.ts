import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdonnanceService } from '../ordonnance.service';

interface Medication {
  nom_medicament: string;
  dose: string;
  duree: string;
}

@Component({
  selector: 'app-nouvelle-ordonnance',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nouvelle-ordonnance.component.html',
  styleUrls: ['./nouvelle-ordonnance.component.css'],
})
export class NouvelleOrdonnanceComponent implements OnInit {
  medications: Medication[] = [{ nom_medicament: '', dose: '', duree: '' }];
  formValid = false;
  ordonnanceId: number | null = null; // ID de l'ordonnance après création

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordonnanceService: OrdonnanceService
  ) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
    console.log('ID de la consultation:', consultationId);
  }

  // Ajouter un médicament à la liste
  addMedication() {
    this.medications.push({ nom_medicament: '', dose: '', duree: '' });
    this.validateForm();
  }

  // Supprimer un médicament de la liste
  removeMedication(index: number) {
    this.medications.splice(index, 1);
    this.validateForm();
  }

  // Valider le formulaire
  validateForm() {
    this.formValid = this.medications.every((medication) => {
      return medication.nom_medicament && medication.dose && medication.duree;
    });
  }

  // Sauvegarder les médicaments
  sauvegarder(): void {
    if (this.formValid) {
      // Récupérer l'ID de la consultation
      const consultationId = this.route.snapshot.paramMap.get('id');
  
      // 1. Créer l'ordonnance
      const ordonnanceData = { /* Données de l'ordonnance */ };
      this.ordonnanceService.createOrdonnance(Number(consultationId), ordonnanceData).subscribe(
        (response) => {
          console.log('Ordonnance créée avec succès:', response);
          // Récupérer l'ID de l'ordonnance créée
          this.ordonnanceId = response.id;
  
          // 2. Ajouter les médicaments à l'ordonnance
          this.addMedicaments();
  
          // 3. Redirection après sauvegarde
          this.router.navigate(['../../../consultations'], { relativeTo: this.route });
        },
        (error) => {
          console.error('Erreur lors de la création de l\'ordonnance:', error);
        }
      );
    } else {
      console.log('Formulaire invalide, veuillez remplir tous les champs.');
    }
  }
  
  addMedicaments() {
    if (this.ordonnanceId) {
      this.medications.forEach((medication) => {
        const medicamentData = {
          nom_medicament: medication.nom_medicament,
          dose: medication.dose,
          duree: medication.duree,
          ordonnance_id: this.ordonnanceId // Ajout de l'ID de l'ordonnance ici
        };
  
        this.ordonnanceService.createMedicament(medicamentData).subscribe(
          (response) => {
            console.log('Médicament ajouté avec succès', response);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du médicament', error);
          }
        );
      });
    } else {
      console.log('Aucune ordonnance ID disponible pour ajouter les médicaments.');
    }
  }
}
