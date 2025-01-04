import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadIconComponent } from '../../../../../../assets/icons/download-icon/download-icon.component';
import { ButtonComponent } from '../../../../../components/utilities/button/button.component';
import { NouveauSoinComponent } from './nouveau-soin/nouveau-soin.component';


export type TypeSoin =
  'Administration de medicaments' |
  'Changement de pensements' |
  'Mesures de Parametres Medicaux';

const soinColorsText: Record<TypeSoin, string> = {
    'Administration de medicaments': "text-[#FF5733]",        // Orange
    'Changement de pensements': "text-[#33C1FF]",         // Blue
    'Mesures de Parametres Medicaux': "text-[#28C76F]",    // Green
  };
  const soinColorsBg: Record<TypeSoin, string> = {
    'Administration de medicaments': "#FF5733",        // Orange
    'Changement de pensements': "#33C1FF",         // Blue
    'Mesures de Parametres Medicaux': "#28C76F10",    // Green
  };
  
interface Consultation {
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
interface Dossier {
  soins : Soin []
}

interface Soin {
  dateAjout:string;
  typeSoin: TypeSoin;
  description:string;
}

@Component({
  selector: 'app-soins-prodigues',
  standalone: true,
  imports: [CommonModule,DownloadIconComponent,ButtonComponent,NouveauSoinComponent],
  templateUrl: './soins-prodigues.component.html',
  styleUrl: './soins-prodigues.component.css'
})
export class SoinsProdiguesComponentInfirmier {
  popupVisible: boolean = false;
  deleteType: string = '';
  consultationToDelete: Consultation | null = null;

  consultations: Consultation[] = [
    { 
      nom: 'Braham Imad', 
      nss: '0673222612', 
      dateAjout: '2023-04-06', 
      ordonnance: 'Ordonnance A', 
      bilanb: 'Bilan A', 
      bilanr: 'Bilan A', 
      resultatsb: 'Resultats A', 
      resultatsr: 'Resultats A', 
      resume: 'Résumé A'
    },
    { 
      nom: 'Sarah Ali', 
      nss: '0233222612', 
      dateAjout: '2023-05-10', 
      ordonnance: 'Ordonnance B', 
      bilanb: '', 
      bilanr: 'Bilan A', 
      resultatsb: 'Resultats B',
      resultatsr: '',  
      resume: 'Résumé B'
    },
    { 
      nom: 'Ahmed Karim', 
      nss: '0783222612', 
      dateAjout: '2023-06-12', 
      ordonnance: '', 
      bilanb: 'Bilan C', 
      bilanr: '', 
      resultatsb: 'Resultats C', 
      resultatsr: 'Resultats B', 
      resume: ''
    },
    // Add more consultations as needed
  ];
  listeSoins: Soin[]=[
    {
      dateAjout:'2024-12-23',
      typeSoin: 'Administration de medicaments',
      description:'une description random',
    },
    {
      dateAjout:'2024-05-30',
      typeSoin: 'Changement de pensements',
      description:'une autre description random'
    },
    {
      dateAjout:'2024-05-30',
      typeSoin: 'Mesures de Parametres Medicaux',
      description:'encore une autre description random'
    }
  ]
  // Updated displayed columns for consultations
  displayedColumns: string[] = ['Date', 'Type de soin','Description','Action' ];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredConsultations: Consultation[] = [...this.consultations]; // Filtered list

  constructor(public router: Router, public route: ActivatedRoute) {}

  get paginatedConsultations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConsultations.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredConsultations.length / this.itemsPerPage);
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Apply filters
  applyFilters() {
    this.filteredConsultations = this.consultations.filter((consultation) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        consultation.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || consultation.dateAjout === this.selectedDate;
      return matchesSearch && matchesDate;
    });

    // Reset to first page after filtering
    this.currentPage = 1;
  }

  editConsultation(nss: string) {
    this.router.navigate(['/modifier-consultation', nss]);
  }

  openPopup(type: string, consultation: Consultation) {
    this.deleteType = type;  // Save whether we're dealing with ordonnance or resume
   // this.consultationToDelete = consultation;
    this.popupVisible = true;
  }
  
  confirmDelete() {
    if (this.deleteType && this.consultationToDelete) {
      if (this.deleteType === 'ordonnance') {
        this.consultationToDelete.ordonnance = '';  // Clear ordonnance
      } else if (this.deleteType === 'resume') {
        this.consultationToDelete.resume = '';  // Clear resume
      }
    }
    this.popupVisible = false;  // Hide the popup after deletion
  }
  
  viewDetails( nss: string) {
    this.router.navigate(['/details-consultation', nss]);
  }
  
  cancelDelete() {
    this.popupVisible = false;
    this.consultationToDelete = null;
  }

  addOrUpdate(type: 'resume' | 'ordonnance', consultation: Consultation) {
    if (type === 'resume') {
      consultation.resume = 'New Resume'; // Add logic to handle resume addition
    } else if (type === 'ordonnance') {
      consultation.ordonnance = 'New Ordonnance'; // Add logic to handle ordonnance addition
    }
  }

  addNewResume() {
    this.router.navigate(['/nouveau-resume']);
  }


   getSoinColorText(soin: TypeSoin): string {
    return soinColorsText[soin];
  }
   getSoinColorBG(soin: TypeSoin): string {
    return soinColorsBg[soin];
  }
  newSoin=false;
  ajouterSoin(){
    this.newSoin=true;
  }
  cancelAjouterSoin(){
    this.newSoin=false;
  }
}
