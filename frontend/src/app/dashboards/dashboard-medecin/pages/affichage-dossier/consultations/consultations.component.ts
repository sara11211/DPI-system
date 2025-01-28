import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConsultationService } from './consultations.service';
import { ApiService } from '../../../../../services/api.service';

interface Consultation {
  id: string;
  nom: string;
  date_consultation: string;
  ordonnance: string;
  resume_consultation: string;
  bilanb: boolean;
  bilanr: boolean;
  resultatsb: boolean;
  resultatsr: boolean;
  
}

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css',
})
export class ConsultationsComponent {
  popupVisible: boolean = false;
  deleteType: string = '';
  consultationToDelete: Consultation | null = null;
  isModalVisible: boolean = false;
  consultation: any;

  consultations: Consultation[] = [];

  displayedColumns: string[] = [
    'Date',
    'Ordonnance',
    'Bilan',
    'Resultats',
    'Resume',
  ];

  itemsPerPage = 5;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredConsultations: Consultation[] = [...this.consultations];

  consultationToUpdate: Consultation | null = null;
  ordonnanceToAdd: string = '';

  constructor(public router: Router, 
              public route: ActivatedRoute,
              private apiService: ApiService,
              private consultationService: ConsultationService
            ) {}



  ngOnInit(): void {

    const nss = '418626877306';//Jai besoin de recuperer dynamiquement le nss de ce dossier :

    this.consultationService.getConsultationsForPatient(nss).subscribe((data) => {
      this.consultations = data;
      for(const item of this.consultations)
      {
        this.apiService.getbilanradioconsultation(Number(item.id)).subscribe((data) => {
          item.bilanr = data[0].id;
          console.log(data);
          if ( data[0].date_radiologie !== null )
          {
            item.resultatsr = true;
          }
        });
        
        this.apiService.getAnalyseBio(Number(item.id)).subscribe((data) => {
          item.bilanb = data[0].id;
          console.log(data);
          if ( data[0].quantite !== null )
            {
              item.resultatsb =true;
            }
        });
      }
      this.filteredConsultations = [...this.consultations];
      console.log(this.consultations)
    });

    


    this.router.events.subscribe(() => {
      // Check if the current route matches the modal route
      this.isModalVisible =
        this.router.url.includes('nouvelle-ordonnance') ||
        this.router.url.includes('affichage-ordonnance') ||
        this.router.url.includes('resultat-bio') ||
        this.router.url.includes('nouveau-bilan-bio') ||
        this.router.url.includes('affichage-bilan-bio') ||
        this.router.url.includes('resultat-radio') ||
        this.router.url.includes('nouveau-bilan-radio') ||
        this.router.url.includes('affichage-bilan-radio') ||
        this.router.url.includes('nouveau-resume') ||
        this.router.url.includes('affichage-resume') ||
        this.router.url.includes('visualisation')
        ;
    });
 
 
 
 
 
 
 
  }

  closeModal() {
    this.router.navigate(['../consultations'], { relativeTo: this.route });
  }

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

  changePage(page: number) {
    this.currentPage = page;
  }

  openPopup(type: string, consultation: Consultation) {
    this.deleteType = type;
    this.consultationToDelete = consultation;
    this.popupVisible = true;
  }

  confirmDelete() {
    if (this.deleteType && this.consultationToDelete) {
      if (this.deleteType === 'ordonnance') {
        this.consultationToDelete.ordonnance = '';
      } else if (this.deleteType === 'resume') {
        this.consultationToDelete.resume_consultation = '';
      }
    }
    this.popupVisible = false;
  }

  cancelDelete() {
    this.popupVisible = false;
    this.consultationToDelete = null;
  }

  openModalNouvelleOrdonnance(id: string): void {
    this.router.navigate(['nouvelle-ordonnance', id], {
      relativeTo: this.route,
    });
  }

  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['affichage-ordonnance', id], {
      relativeTo: this.route,
    });
  }

  openModalResultatBio(id: string): void {
    this.router.navigate(['resultat-bio', id], { relativeTo: this.route });
  }

  openModalNouveauBilanBio(id: string): void {
    this.router.navigate(['nouveau-bilan-bio', id], { relativeTo: this.route });
  }

  openModalAffichageBilanBio(id: string): void {
    this.router.navigate(['affichage-bilan-bio', id], {
      relativeTo: this.route,
    });
  }

  openModalResultatRadio(id: string): void {
    this.router.navigate(['resultat-radio', id], { relativeTo: this.route });
  }

  openModalNouveauBilanRadio(id: string): void {
    this.router.navigate(['nouveau-bilan-radio', id], {
      relativeTo: this.route,
    });
  }

  openModalAffichageBilanRadio(id: string): void {
    this.router.navigate(['affichage-bilan-radio', id], {
      relativeTo: this.route,
    });
  }

  openModalNouveauResume(id: string): void {
    this.router.navigate(['nouveau-resume', id], { relativeTo: this.route });
  }

  openModalAffichageResume(id: string): void {
    this.router.navigate(['affichage-resume', id], { relativeTo: this.route });
  }

  openModalVisualisation(id: string): void {
    this.router.navigate(['visualisation', id], { relativeTo: this.route });
  }
}