import { Component } from '@angular/core';
import { Route, ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { DownloadIconComponent } from '../../../assets/icons/download-icon/download-icon.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';



interface Consultation {
  id: string;
  nom: string;
  nss: string;
  dateAjout: string;
  ordonnance: string;
  bilanb: string;
  bilanr: string;
  resultatsb: string;
  resultatsr: string;
  resume: string;
}
export type TypeSoin =
  | 'Administration de medicaments'
  | 'Changement de pensements'
  | 'Mesures de Parametres Medicaux';

const soinColorsText: Record<TypeSoin, string> = {
  'Administration de medicaments': 'text-[#FF5733]', // Orange
  'Changement de pensements': 'text-[#33C1FF]', // Blue
  'Mesures de Parametres Medicaux': 'text-[#28C76F]', // Green
};
const soinColorsBg: Record<TypeSoin, string> = {
  'Administration de medicaments': '#FF5733', // Orange
  'Changement de pensements': '#33C1FF', // Blue
  'Mesures de Parametres Medicaux': '#28C76F10', // Green
};
interface Soin {
  dateAjout: string;
  typeSoin: TypeSoin;
  description: string;
}
@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [DownloadIconComponent, CommonModule, RouterOutlet],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css',
})
export class DashboardPatientComponent {
  dossierData = {
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
    TypeCouverture: 'Complète',
    dateAjout: '2023-04-06',
  };


  consultations: Consultation[] = [
    {
      id: '1',
      nom: 'Braham Imad',
      nss: '0673222612',
      dateAjout: '2023-04-06',
      ordonnance: 'Ordonnance A',
      bilanb: 'Bilan A',
      bilanr: 'Bilan A',
      resultatsb: 'Resultats A',
      resultatsr: 'Resultats A',
      resume: 'Résumé A',
    },
    {
      id: '2',
      nom: 'Sarah Ali',
      nss: '0233222612',
      dateAjout: '2023-05-10',
      ordonnance: 'Ordonnance B',
      bilanb: '',
      bilanr: 'Bilan A',
      resultatsb: 'Resultats B',
      resultatsr: '',
      resume: 'Résumé B',
    },
    {
      id: '3',
      nom: 'Ahmed Karim',
      nss: '0783222612',
      dateAjout: '2023-06-12',
      ordonnance: '',
      bilanb: 'Bilan C',
      bilanr: '',
      resultatsb: 'Resultats C',
      resultatsr: 'Resultats B',
      resume: '',
    },
    // Add more consultations as needed
  ];
  listeSoins: Soin[] = [
    {
      dateAjout: '2024-12-23',
      typeSoin: 'Administration de medicaments',
      description: 'une description random',
    },
    {
      dateAjout: '2024-05-30',
      typeSoin: 'Changement de pensements',
      description: 'une autre description random',
    },
    {
      dateAjout: '2024-05-30',
      typeSoin: 'Mesures de Parametres Medicaux',
      description: 'encore une autre description random',
    },
  ];
  displayedColumns: string[] = [
    'Date',
    'Ordonnance',
    'Bilan',
    'Resultats',
    'Resume',
  ];
  displayedColumns2: string[] = [
    'Date',
    'Type de soin',
    'Description',
  ];

  isModalVisible: boolean = false;

  consultation = this.getLastestConsultation();

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    let nss = this.route.snapshot.paramMap.get('nss');
    if (!nss) {
      nss = '0673222612';
    }

    this.router.events.subscribe(() => {
      // Check if the current route matches the modal route
      this.isModalVisible =
        this.router.url.includes('affichage-ordonnance') ||
        this.router.url.includes('affichage-resume') ||
        this.router.url.includes('affichage-bilan-bio') ||
        this.router.url.includes('affichage-bilan-radio') ||
        this.router.url.includes('resultat-bio') ||
        this.router.url.includes('resultat-radio')
    });
    // Retrieve the user object from localStorage
    const userString: string | null = localStorage.getItem('user');

    // Check if the user string exists and is not null
    if (userString) {
      // Parse the user object
      const user = JSON.parse(userString);

      // Check if the user object and the patient attribute exist
      if (user && user.patient) {
        // Extract the nom from the patient object
        const nomFromLocalStorage = user.patient.nom;

        // Update the nom in dossierData
        this.dossierData.nom = nomFromLocalStorage;
      }
    } else {
      console.error('No user data found in localStorage.');
    }
  }

  closeModal() {
    this.router.navigate(['../dashboard'], { relativeTo: this.route });
  }

  getLastestConsultation(): Consultation {
    return this.consultations[0];
  }
  viewDetails(nss: string) {
    this.router.navigate(['/details-consultation', nss]);
  }
  afficherBilan(nss: string) {}
  download(type: string, consultation: Consultation) {}

  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['affichage-ordonnance', id], {
      relativeTo: this.route,
    });
  }

  openModalAffichageResume(id: string): void {
    this.router.navigate(['affichage-resume', id], { relativeTo: this.route });
  }

  openModalAffichageBilanBio(id: string): void {
    this.router.navigate(['affichage-bilan-bio', id], { relativeTo: this.route });
  }

  openModalAffichageBilanRadio(id: string): void {
    this.router.navigate(['affichage-bilan-radio', id], { relativeTo: this.route });
  }

  openModalResultatBio(id: string): void {
    this.router.navigate(['resultat-bio', id], { relativeTo: this.route });
  }

  openModalResultatRadio(id: string): void {
    this.router.navigate(['resultat-radio', id], { relativeTo: this.route });
  }
}
