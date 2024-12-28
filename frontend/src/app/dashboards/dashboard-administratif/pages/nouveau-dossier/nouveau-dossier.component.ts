import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './nouveau-dossier.component.html',
  styleUrl: './nouveau-dossier.component.css',
})
export class NouveauDossierComponent implements OnInit{
  dossierForm: FormGroup;
  medecins: { id: number; nom: string; prenom: string }[] = [];
  

ngOnInit(): void {
  this.fetchMedecins();
}

readonly endpointGetDoctors = 'http://127.0.0.1:8000/api/get-medecins/';
fetchMedecins(): void {
  this.http.get<{ id: number; nom: string; prenom: string }[]>(this.endpointGetDoctors)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.medecins = data;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      }
    });
}

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.dossierForm = this.fb.group({
      nss: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
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

      typeCouverture: [
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


  readonly endpointCreateDpi = 'http://127.0.0.1:8000/api/dpis/create/'; 
  readonly endpointSearchDoc = 'http://127.0.0.1:8000/api/recherche-docteur/';
  readonly endpointCreateContact = 'http://127.0.0.1:8000/api/personnes_contacts/create/'; 
  readonly endpointCreateMutuelle = 'http://127.0.0.1:8000/api/mutuelles/create/'; 

  onCreateContact(contactData: any): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{ id: number }>(this.endpointCreateContact, contactData, {
        headers: { 'Content-Type': 'application/json' },
      }).subscribe({
        next: (response) => {
          console.log('PersonneContact created:', response);
          resolve(response.id);
        },
        error: (error) => {
          console.error('Error creating PersonneContact:', error);
          reject(error); 
        },
      });
    });
  }

  async onSubmit() {
  
  
      if (this.dossierForm.valid) {
      const contactData = {
        nom_contact: this.dossierForm.value.nomContact,
        prenom_contact: this.dossierForm.value.prenomContact,
        numero_telephone: this.dossierForm.value.numTelContact,
      };

      const contactId = await this.onCreateContact(contactData);
      const medecinId = this.dossierForm.value.medecinTraitant;

      //const qrCodeUrl = `/generate_qr_code/${this.dossierForm.value.nss}/`;
      //const link = document.createElement('a');
      //link.href = qrCodeUrl;
      //link.download = `qr_code_${this.dossierForm.value.nom}_${this.dossierForm.value.prenom}_${this.dossierForm.value.nss}.png`;
      //link.click();
      //const qrCodePath = `downloads/${link.download}`;
        const dossierData = {
          nss: this.dossierForm.value.nss,
          nom: this.dossierForm.value.nom,
          prenom: this.dossierForm.value.prenom,
          date_naissance: this.dossierForm.value.dateNaiss,
          adresse: this.dossierForm.value.adresse,
          num_telephone: this.dossierForm.value.numTel,
          medecins_id: medecinId,
          personnes_contact_id: contactId, 
          //qr_url: qrCodePath 

        };
        this.http
        .post<{ id: number }>(this.endpointCreateDpi, dossierData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: (response) => {
            console.log('Dossier successfully submitted:', response);
            const dpiId = response.id; 
            this.createMutuelle(dpiId); 
          },
          error: (error) => {
            console.error('An error occurred during submission:', error);
          },
        });
      } else {
        console.error('Form is invalid');
      }
    } 


    createMutuelle(dpiId: number) {
      const mutuelleData = {
        nom_mutuelle: this.dossierForm.value.nomMutuelle,
        type_couverture: this.dossierForm.value.typeCouverture,
        num_adherent: this.dossierForm.value.numAdherent,
        dpis_id: dpiId, 
      };
    
      this.http
        .post(this.endpointCreateMutuelle, mutuelleData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: (response) => {
            console.log('Mutuelle successfully created:', response);
          },
          error: (error) => {
            console.error('An error occurred while creating Mutuelle:', error);
          },
        });
    }
  
}