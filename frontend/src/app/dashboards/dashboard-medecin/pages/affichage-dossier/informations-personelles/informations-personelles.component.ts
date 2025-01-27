import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

interface DossierForm {
  nss: FormControl<string | null>;
  nom: FormControl<string | null>;
  prenom: FormControl<string | null>;
  dateNaiss: FormControl<string | null>;
  adresse: FormControl<string | null>;
  numTel: FormControl<string | null>;
  medecinTraitant: FormControl<string | null>;
  nomContact: FormControl<string | null>;
  prenomContact: FormControl<string | null>;
  numTelContact: FormControl<string | null>;
  nomMutuelle: FormControl<string | null>;
  numAdherent: FormControl<string | null>;
  TypeCouverture: FormControl<string | null>;
  dateAjout: FormControl<string | null>;
}

@Component({
  selector: 'app-informations-personelles',
  standalone: true,
  imports: [],
  templateUrl: './informations-personelles.component.html',
  styleUrl: './informations-personelles.component.css'
})

export class InformationsPersonellesComponent implements OnInit {
 /* dossierData = {
    nss: '123456789012',
    nom: 'Doe',
    prenom: 'John',
    numTel: '0123456789',
    dateNaiss: '1980-01-01',
    adresse: '123 Street, City, Country',
    medecinTraitant: '1', 
    nomContact: 'Jane Doe',
    prenomContact: 'Doe',
    numTelContact: '0987654321',
    nomMutuelle: 'HealthPlus',
    numAdherent: '5678',
    TypeCouverture: 'Complète',
  };

  medecins = [
    { id: '1', name: 'Dr. A' },
    { id: '2', name: 'Dr. B' },
    { id: '3', name: 'Dr. C' },
  ];*/
    errorMessage: string | null = null;
    readonly endpointGetDossierNSS = 'http://127.0.0.1:8000/api/dpis_nss/'; 
    httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
    };
    dossierData: FormGroup<DossierForm>;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private http: HttpClient,
      private fb: FormBuilder
    ) {

      this.dossierData = this.fb.group({
        nss: [''],
        nom: [''],
        prenom: [''],
        dateNaiss: [''],
        adresse: [''],
        numTel: [''],
        medecinTraitant: [''],
        nomContact: [''],
        prenomContact: [''],
        numTelContact: [''],
        nomMutuelle: [''],
        numAdherent: [''],
        TypeCouverture: [''],
        dateAjout: ['']
      });
    }


  ngOnInit(): void {
    const nss = this.route.parent?.snapshot.paramMap.get('nss');
      if (nss) {
        this.fetchDossierData(nss); 
      } else {
        console.error('NSS is null');
        this.errorMessage = 'Le NSS est manquant ou invalide.';
      }
  }
  
  readonly endpointFetchDossiers = 'http://127.0.0.1:8000/api/dpis_nss/';
  readonly endpointGetDoctor = 'http://127.0.0.1:8000/api/get-medecin_traitant/';
  readonly endpointGetMutuelle = 'http://127.0.0.1:8000/api/get_mutuelle/'
  readonly endpointGetContact = 'http://127.0.0.1:8000/api/get_contact/'

    fetchDossierData(nss: string) {
      const endpointWithParam = `${this.endpointFetchDossiers}${nss}/`;

      this.http.get<any>(endpointWithParam, this.httpOptions).subscribe({
        next: (data) => {
          const dossierInfo = Array.isArray(data) ? data[0] : data; 
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
            TypeCouverture: '',
            dateAjout: '2025-01-28'
          };
    
          if (dossierInfo.medecins_id) {
            this.http.get<any>(`${this.endpointGetDoctor}${dossierInfo.medecins_id}`)
              .subscribe({
                next: (doctorData) => {
                  dossierData.medecinTraitant = `${doctorData.nom} ${doctorData.prenom}`;
                  this.dossierData.patchValue({ medecinTraitant: dossierData.medecinTraitant });
                },
                error: (error) => console.error('Doctor fetch error:', error)
              });
          }
    
          if (dossierInfo.personnes_contact_id) {
            this.http.get<any>(`${this.endpointGetContact}${dossierInfo.personnes_contact_id}`)
              .subscribe({
                next: (contactData) => {
                  dossierData.nomContact = contactData.nom_contact;
                  dossierData.prenomContact = contactData.prenom_contact;
                  dossierData.numTelContact = contactData.numero_telephone;
                  this.dossierData.patchValue({
                    nomContact: dossierData.nomContact,
                    prenomContact: dossierData.prenomContact,
                    numTelContact: dossierData.numTelContact
                  });
                },
                error: (error) => console.error('Contact fetch error:', error)
              });
          }
    
          if (dossierInfo.id) {
            this.http.get<any>(`${this.endpointGetMutuelle}${dossierInfo.id}`)
              .subscribe({
                next: (mutuelleData) => {
                  dossierData.nomMutuelle = mutuelleData.nom_mutuelle;
                  dossierData.numAdherent = mutuelleData.num_adherent;
                  dossierData.TypeCouverture = mutuelleData.type_couverture;
                  this.dossierData.patchValue({
                    nomMutuelle: dossierData.nomMutuelle,
                    numAdherent: dossierData.numAdherent,
                    TypeCouverture: dossierData.TypeCouverture
                  });
                },
                error: (error) => console.error('Mutuelle fetch error:', error)
              });
          }
  
          this.dossierData.patchValue(dossierData);
        },
        error: (error) => {
          console.error('Initial fetch error:', error);
        }
      });
    }

}