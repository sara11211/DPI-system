import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { SoinsService } from '../../infirmier.service';

const allowedTypeSoins: string[] = [
  'Administration de medicaments',
  'Changement de pensements',
  'Mesures de Parametres Medicaux',
];

export function typeSoinValidator(allowedTypeSoins: string[]): ValidatorFn {
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
  styleUrls: ['./nouveau-soin.component.css']
})
export class NouveauSoinComponent {

  soinForm: FormGroup;
  patientId: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private soinsService: SoinsService) {
    this.soinForm = this.fb.group({
      dateSoin: ['', Validators.required],
      heureSoin: ['', Validators.required],
      typeSoin: ['', [Validators.required, typeSoinValidator(allowedTypeSoins)]],
      nomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      prenomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      nss: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      description: ['', Validators.required],
    });
  }

  isDropdownOpen = false;
  selectedOption = '';
  options = allowedTypeSoins;

  // Méthode pour récupérer l'ID du patient à partir du NSS
  getPatientId(nss: string) {
    this.soinsService.getPatientIdByNss(nss).subscribe({
      next: (response) => {
        if (response.patient_id) {
          this.patientId = response.patient_id;
          console.log('ID du patient récupéré:', this.patientId);
        } else {
          console.error('Aucun patient trouvé avec ce NSS');
          window.alert('Aucun patient trouvé avec ce NSS.');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'ID du patient:', error);
        window.alert('Erreur lors de la récupération de l\'ID du patient.');
      },
    });
  }

  onSubmit() {
    if (this.soinForm.valid) {
      console.log('Form Data:', this.soinForm.value);
      const soinData = this.soinForm.value;
      
      // Appeler la méthode pour récupérer l'ID du patient avant de soumettre
      this.getPatientId(soinData.nss);

      // Vérifier si l'ID du patient est récupéré
      if (this.patientId !== null) {
        // Création du JSON formaté pour le backend
        const formattedData = {
          date_soin: soinData.dateSoin,
          heure_soin: soinData.heureSoin,
          type_soin: soinData.typeSoin,
          nomPatient: soinData.nomPatient,
          prenomPatient: soinData.prenomPatient,
          nss: soinData.nss,
          description_soin: soinData.description,
          infirmiers_id: 1,  // ID de l'infirmier (à remplacer si nécessaire)
          patient: this.patientId,  // ID du patient récupéré
        };

        // Appeler le service pour créer le soin
        this.soinsService.createSoin(formattedData).subscribe({
          next: (response) => {
            console.log('Soin créé avec succès:', response);
            window.alert('Soin créé avec succès!');
            // Naviguer après création si nécessaire
            // this.router.navigate([`/recherche-dossier/${soinData.nss}/consultations`]);
          },
          error: (error) => {
            console.error('Erreur lors de la création du soin:', error);
          }
        });
      } else {
        console.log('ID du patient non récupéré, annulation de la création du soin.');
      }
    } else {
      console.log('Formulaire invalide');
    }
  }
}
