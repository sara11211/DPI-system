import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

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
  selector: 'app-modify-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.css',
})
export class ModifierInfoComponent {
  dossierForm: FormGroup;
  dossier: Dossier | null = null;

  medecins = [
    { id: '1', name: 'Dr. A' },
    { id: '2', name: 'Dr. B' },
    { id: '3', name: 'Dr. C' },
  ];

  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute) {
    this.dossierForm = this.fb.group({
      nss: [{
        value : this.dossier?.nss,
        disabled : true}
      ],

      nom: [{
        value : this.dossier?.nom,
        disabled : true}
      ],
      prenom:[{
        value : this.dossier?.prenom,
        disabled : true}
      ],
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

  ngOnInit(): void {
    let nss = this.route.snapshot.paramMap.get('nss');
    if (!nss) {
      nss="0673222612";}
    console.log(nss);
    if (nss) {
      this.fetchDossierData(nss);
    }
  }

  fetchDossierData(nss: string): void {
    
    const dossiers: Dossier[] = [
      {
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
      },
      {
        nom: 'Sarah Ali',
        prenom: 'Sarah',
        nss: '0233222612',
        numTel: '0555222623',
        dateNaiss: '1985-08-20',
        adresse: 'Oran, Algeria',
        medecinTraitant: 'Dr. Rachid Bellahcene',
        nomContact: 'Ahmed Ali',
        prenomContact: 'Ahmed',
        numTelContact: '0555222624',
        nomMutuelle: 'Mutuelle Sante Plus',
        numAdherent: 'MSP67890',
        typeCouverture: 'Partielle',
        dateAjout: '2023-05-10',
      },
      {
        nom: 'Ahmed Karim',
        prenom: 'Karim',
        nss: '0783222612',
        numTel: '0555222634',
        dateNaiss: '1992-11-30',
        adresse: 'Constantine, Algeria',
        medecinTraitant: 'Dr. Youssef Tizi',
        nomContact: 'Lina Karim',
        prenomContact: 'Lina',
        numTelContact: '0555222635',
        nomMutuelle: 'Mutuelle Constant',
        numAdherent: 'MC11223',
        typeCouverture: 'Complète',
        dateAjout: '2023-06-12',
      },
    ];

    this.dossier = dossiers.find((d) => d.nss === nss) || null;
    if (this.dossier) {
      this.dossierForm.patchValue(this.dossier);
    }
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
      return 'NSS doit avoir exactement 12 chiffres';
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

      this.router.navigate(['/mes-informations-personelles']);
    }
  }
}
