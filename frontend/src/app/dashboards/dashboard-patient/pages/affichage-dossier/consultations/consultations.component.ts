import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DownloadIconComponent } from '../../../../../../assets/icons/download-icon/download-icon.component';
import { ApiService } from '../../../../../services/api.service';
import { ConsultationService } from '../../../patient.service';
import { AuthService } from '../../../../../login/auth.service';
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
  nss: string;
}

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, DownloadIconComponent, RouterOutlet],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class ConsultationsComponentPatient implements OnInit {
  popupVisible: boolean = false;
  deleteType: string = '';
  consultationToDelete: Consultation | null = null;

  consultations: Consultation[] = [];

  // Updated displayed columns for consultations
  displayedColumns: string[] = ['Date', 'Ordonnance', 'Bilan', 'Resultats', 'Resume'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;
  isModalVisible: boolean = false;

  filteredConsultations: Consultation[] = [...this.consultations]; // Filtered list

  
    constructor(public router: Router, 
                public route: ActivatedRoute,
                private apiService: ApiService,
                private consultationService: ConsultationService,
                private authService: AuthService,
              ) {}

  
              ngOnInit(): void {

                const nss = this.authService.getUser().patient.nss;
                console.log(nss);
            
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
        !this.selectedDate || consultation.date_consultation === this.selectedDate;
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
    this.consultationToDelete = consultation;
    this.popupVisible = true;
  }
  
  confirmDelete() {
    if (this.deleteType && this.consultationToDelete) {
      if (this.deleteType === 'ordonnance') {
        this.consultationToDelete.ordonnance = '';  // Clear ordonnance
      } else if (this.deleteType === 'resume') {
        this.consultationToDelete.resume_consultation = '';  // Clear resume
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
  
  openModalVisualisation(id: string): void {
    this.router.navigate(['visualisation', id], { relativeTo: this.route });
  }
  openModaldownloadOrdonnance(consultation: Consultation) {
    // Assurez-vous que l'ordonnance existe
    if (consultation.ordonnance) {
      const ordonnanceId = consultation.ordonnance;  // Récupérer l'ID de l'ordonnance depuis la consultation
      this.consultationService.telechargerOrdonnance(Number(ordonnanceId)).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordonnance_${ordonnanceId}.docx`; // Nom du fichier basé sur l'ID de l'ordonnance
        a.click();
        window.URL.revokeObjectURL(url);  // Libérer l'URL du Blob après le téléchargement
      });
    } else {
      console.error("Aucune ordonnance disponible pour cette consultation");
    }
  }
  openModaldownloadResume(consultation: Consultation) {
    // Assurez-vous que la consultation existe
    if (consultation) {
      const consultationId = consultation.id;  // Récupérer l'ID de la consultation
  
      // Appeler le service pour télécharger le résumé de la consultation
      this.consultationService.telechargerResume(Number(consultationId)).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Resume_consultation_${consultationId}.docx`; // Nom du fichier basé sur l'ID de la consultation
        a.click();
        window.URL.revokeObjectURL(url);  // Libérer l'URL du Blob après le téléchargement
      });
    } else {
      console.error("Aucune consultation disponible pour télécharger le résumé");
    }
  }
  
  
}
