import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../../components/utilities/button/button.component';
import { ModifierInfoComponent } from './modifier/modifier.component';
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
  imports: [ButtonComponent,ModifierInfoComponent,RouterOutlet, CommonModule],
  templateUrl: './informations-personelles.component.html',
  styleUrl: './informations-personelles.component.css'
})
export class InformationsPersonellesPatientComponent implements OnInit {


  nss: string = '';
  errorMessage: string | null = null;
  dossierFound: boolean = false;
  dossier: any = null;


  ngOnInit(): void {
    const userString = localStorage.getItem('user');

  if (userString) {
    try {
      const user = JSON.parse(userString);
      console.log('User object from local storage:', user); // Debugging

      if (user && user.patient) {
        this.nss = user.patient.nss;
        console.log('rez:', this.nss);
        this.fetchDossierData(this.nss);
        
      }
      else {
        console.error('Patient data is missing or null in the user object.');
      }
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
    }
  } else {
    console.error('No user data found in local storage.');
  }
      
  }



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
            dateAjout: '2023-04-06'
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

  


  isRouteActive(route: string): boolean {
    return this.router.url.split('/').pop() === route;
  }
  


  modify(){
    // Navigate to modify
    this.router.navigate(['modifier'], { relativeTo: this.route});
  }
}