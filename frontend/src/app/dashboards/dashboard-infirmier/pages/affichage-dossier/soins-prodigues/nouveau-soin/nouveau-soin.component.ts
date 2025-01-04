import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeSoin } from '../soins-prodigues.component';

const allowedTypeSoins: TypeSoin[] = [
  'Administration de medicaments',
  'Changement de pensements',
  'Mesures de Parametres Medicaux',
];
export function typeSoinValidator(allowedTypeSoins: TypeSoin[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = allowedTypeSoins.includes(control.value);
    return isValid ? null : { invalidTypeSoin: { value: control.value } };
  };
}

interface Dossier {
  nom: string;
  prenom: string;
  nss: string;
  numTel: string;
  dateNaiss: string;
  adresse: string;
  medecinTraitant: string;
  nomContact: string;
  prenomContact: string;
  numTelContact: string;
  nomMutuelle: string;
  numAdherent: string;
  typeCouverture: string;
  dateAjout: string;
}

@Component({
  selector: 'app-nouveau-soin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nouveau-soin.component.html',
  styleUrl: './nouveau-soin.component.css'
})
export class NouveauSoinComponent {
    currentDossier :Dossier={
    nom: 'Braham Imad',
    prenom: 'Imad',
    nss: '0673222612',
    numTel: '0555222612',
    dateNaiss: '1990-02-14',
    adresse: 'Algiers, Algeria',
    medecinTraitant: 'Dr. A',
    nomContact: 'Samira Imad',
    prenomContact: 'Samira',
    numTelContact: '0555222613',
    nomMutuelle: 'Mutuelle Sante',
    numAdherent: 'MS12345',
    typeCouverture: 'Complète',
    dateAjout: '2023-04-06',
  }
   soinForm: FormGroup;
  
    constructor(private fb: FormBuilder, private router: Router) {
      this.soinForm = this.fb.group({
        dateSoin: ['', Validators.required],
        heureSoin: ['', Validators.required],
        typeSoin:['', Validators.required , typeSoinValidator(allowedTypeSoins)],
        nomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        prenomPatient: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        nss: [this.currentDossier.nss],
        description: ['', Validators.required],
      });
    }

    isDropdownOpen = false;
    selectedOption='';
    options=allowedTypeSoins;
  
    onSubmit() {
      if (this.soinForm.valid) {
        console.log('Form Data:', this.soinForm.value);
        const nss = this.soinForm.value.nss;
        this.router.navigate([`/recherche-dossier/${nss}/consultations`]);
      } else {
        console.log('Form Invalid');
      }
    }

    


}
