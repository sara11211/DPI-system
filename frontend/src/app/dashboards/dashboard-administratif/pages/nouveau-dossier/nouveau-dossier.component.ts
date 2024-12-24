import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nouveau-dossier',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nouveau-dossier.component.html',
  styleUrl: './nouveau-dossier.component.css',
})
export class NouveauDossierComponent {
  dossierForm: FormGroup;

  medecins = [
    { id: '1', name: 'Dr. A' },
    { id: '2', name: 'Dr. B' },
    { id: '3', name: 'Dr. C' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.dossierForm = this.fb.group({
      nss: [
        '',
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18),
          Validators.pattern('^[0-9]*$'),
        ],
      ],

      nom: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],

      prenom: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],

      numTel: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],

      dateNaiss: ['', [Validators.required]],

      adresse: ['', [Validators.required]],

      medecinTraitant: ['', [Validators.required]],

      nomContact: ['', [Validators.pattern('^[a-zA-Z]+$')]],

      prenomContact: ['', [Validators.pattern('^[a-zA-Z]+$')]],

      numTelContact: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],

      nomMutuelle: [
        '',
      ],

      numAdherent: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
        ],
      ],

      TypeCouverture: [
        '',
      ],

    });
  }

  getNssError(): string | null {
    const control = this.dossierForm.get('nss');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('pattern')) {
      return 'NSS doit contenir uniquement des chiffres';
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'NSS doit avoir exactement 18 chiffres';
    }
    return null;
  }

  getNomError(): string | null {
    const control = this.dossierForm.get('nom');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('pattern')) {
      return 'Le nom doit contenir uniquement des lettres.';
    }
    return null;
  }

  getPrenomError(): string | null {
    const control = this.dossierForm.get('prenom');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('pattern')) {
      return 'Le prenom doit contenir uniquement des lettres.';
    }
    return null;
  }

  getNumTelError(): string | null {
    const control = this.dossierForm.get('numTel');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('pattern')) {
      return 'Le numero de telephone est invalide.';
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'Le numero de telephone est invalide';
    }
    return null;
  }

  getDateNaissanceError(): string | null {
    const control = this.dossierForm.get('dateNaiss');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    return null;
  }

  getAdresseError(): string | null {
    const control = this.dossierForm.get('adresse');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    return null;
  }

  getMedecinTraitantError(): string | null {
    const control = this.dossierForm.get('medecinTraitant');
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    return null;
  }

  getNomContactError(): string | null {
    const control = this.dossierForm.get('nomContact');
    if (control?.hasError('pattern')) {
      return 'Le nom doit contenir uniquement des lettres.';
    }
    return null;
  }

  getPrenomContactError(): string | null {
    const control = this.dossierForm.get('prenomContact');
    if (control?.hasError('pattern')) {
      return 'Le prenom doit contenir uniquement des lettres.';
    }
    return null;
  }

  getNumTelContactError(): string | null {
    const control = this.dossierForm.get('numTelContact');
    if (control?.hasError('pattern')) {
      return 'Le numero de telephone est invalide.';
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'Le numero de telephone est invalide';
    }
    return null;
  }

  getNumAdherentError(): string | null {
    const control = this.dossierForm.get('numAdherent');
    if (control?.hasError('pattern')) {
      return 'Le numero est invalide.';
    }
    return null;
  }

  onSubmit() {
    if (this.dossierForm.valid) {
      console.log('Form Submitted', this.dossierForm.value);

      this.router.navigate(['/liste-dossiers']);
    }
  }
}
