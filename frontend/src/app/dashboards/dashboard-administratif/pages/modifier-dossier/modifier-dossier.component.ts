import { CommonModule } from '@angular/common'; 
import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


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
  selector: 'app-modifier-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './modifier-dossier.component.html',
  styleUrls: ['./modifier-dossier.component.css']
})
export class ModifierDossierComponent implements OnInit {
  // Dans votre classe ModifierDossierComponent
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  medecins: { id: number; nom: string; prenom: string }[] = [];
  
  dossierForm: FormGroup;
  dossier: Dossier | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient) {
    
    this.dossierForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      nss: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numTel: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateNaiss: ['', Validators.required],
      adresse: ['', Validators.required],
      medecinTraitant: ['', Validators.required],
      nomContact: ['', Validators.required],
      prenomContact: ['', Validators.required],
      numTelContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nomMutuelle: ['', Validators.required],
      numAdherent: ['', Validators.required],
      typeCouverture: ['', Validators.required],
      dateAjout: ['', Validators.required],
    });
  }

    ngOnInit(): void {
      this.fetchMedecins();
      const nss = this.route.snapshot.paramMap.get('nss');
      if (nss) {
        this.fetchDossierData(nss);
      }
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

    readonly endpointFetchDossiers = 'http://127.0.0.1:8000/api/dpis_nss/';
    readonly endpointGetDoctor = 'http://127.0.0.1:8000/api/get-medecin_traitant/';
    readonly endpointGetMutuelle = 'http://127.0.0.1:8000/api/get_mutuelle/'
    readonly endpointGetContact = 'http://127.0.0.1:8000/api/get_contact/'

      fetchDossierData(nss: string) {
        console.log("nss : ", nss);
        const endpointWithParam = `${this.endpointFetchDossiers}${nss}/`;
        
        // First API call to get dossier
        this.http.get<any>(endpointWithParam, this.httpOptions).subscribe({
          next: (data) => {
            console.log("Initial API Response:", data); // Check the full response
      
            const dossierInfo = Array.isArray(data) ? data[0] : data;
            console.log("Medecin ID:", dossierInfo.medecins_id);
            console.log("Contact ID:", dossierInfo.personnes_contact_id);
            console.log("DPI ID:", dossierInfo.id);
      
            const dossierData = {
              nss: dossierInfo.nss || '',
              nom: dossierInfo.nom || '',
              prenom: dossierInfo.prenom || '',
              dateNaiss: dossierInfo.date_naissance || '',
              adresse: dossierInfo.adresse || '',
              numTel: dossierInfo.num_telephone || '',
              medecinTraitant: '',
              nomContact: '',
              prenomContact: '',
              numTelContact: '',
              nomMutuelle: '',
              numAdherent: '',
              typeCouverture: '',
              dateAjout: '2023-04-06'
            };
      
            // Get doctor info
            if (dossierInfo.medecins_id) {
              console.log("Fetching doctor info...");
              this.http.get<any>(`${this.endpointGetDoctor}${dossierInfo.medecins_id}`)
                .subscribe({
                  next: (doctorData) => {
                    console.log("Doctor data received:", doctorData);
                    dossierData.medecinTraitant = `${doctorData.nom} ${doctorData.prenom}`;
                    this.dossierForm.patchValue({ medecinTraitant: dossierData.medecinTraitant });
                  },
                  error: (error) => console.error('Doctor fetch error:', error)
                });
            }
      
            // Get contact info
            if (dossierInfo.personnes_contact_id) {
              console.log("Fetching contact info...");
              this.http.get<any>(`${this.endpointGetContact}${dossierInfo.personnes_contact_id}`)
                .subscribe({
                  next: (contactData) => {
                    console.log("Contact data received:", contactData);
                    dossierData.nomContact = contactData.nom_contact;
                    dossierData.prenomContact = contactData.prenom_contact;
                    dossierData.numTelContact = contactData.numero_telephone;
                    this.dossierForm.patchValue({
                      nomContact: dossierData.nomContact,
                      prenomContact: dossierData.prenomContact,
                      numTelContact: dossierData.numTelContact
                    });
                  },
                  error: (error) => console.error('Contact fetch error:', error)
                });
            }
      
            // Get mutuelle info
            if (dossierInfo.id) {
              console.log("Fetching mutuelle info...");
              this.http.get<any>(`${this.endpointGetMutuelle}${dossierInfo.id}`)
                .subscribe({
                  next: (mutuelleData) => {
                    console.log("Mutuelle data received:", mutuelleData);
                    dossierData.nomMutuelle = mutuelleData.nom_mutuelle;
                    dossierData.numAdherent = mutuelleData.num_adherent;
                    dossierData.typeCouverture = mutuelleData.type_couverture;
                    this.dossierForm.patchValue({
                      nomMutuelle: dossierData.nomMutuelle,
                      numAdherent: dossierData.numAdherent,
                      typeCouverture: dossierData.typeCouverture
                    });
                  },
                  error: (error) => console.error('Mutuelle fetch error:', error)
                });
            }
      
            // Update form with initial data
            this.dossierForm.patchValue(dossierData);
            console.log("FINAL VERSION ", dossierData)
          },
          error: (error) => {
            console.error('Initial fetch error:', error);
          }
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
  onSubmit(): void {
    if (this.dossierForm.valid) {
      console.log('Form submitted:', this.dossierForm.value);
      this.router.navigate(['/liste-dossiers']);
    }
  }
}
