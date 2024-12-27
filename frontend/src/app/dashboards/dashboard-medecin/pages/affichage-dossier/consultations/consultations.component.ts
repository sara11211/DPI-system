import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

interface Consultation {
  id: string;
  nom: string;
  dateAjout: string;
  ordonnance: string;
  bilanb: string;
  bilanr: string;
  resultatsb: string;
  resultatsr: string;
  resume: string;
}

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class ConsultationsComponent {
  popupVisible: boolean = false;
  deleteType: string = '';
  consultationToDelete: Consultation | null = null;
  isModalVisible: boolean = false;
  consultation: any;

  consultations: Consultation[] = [
    { 
      id: '1',
      nom: 'Braham Imad', 
      dateAjout: '2023-04-06', 
      ordonnance: 'Ordonnance A', 
      bilanb: 'Bilan A', 
      bilanr: 'Bilan A', 
      resultatsb: 'Resultats A', 
      resultatsr: 'Resultats A', 
      resume: 'Résumé A'
    },
    { 
      id: '2',
      nom: 'Sarah Ali', 
      dateAjout: '2023-05-10', 
      ordonnance: 'Ordonnance B', 
      bilanb: '', 
      bilanr: 'Bilan A', 
      resultatsb: 'Resultats B',
      resultatsr: '',  
      resume: 'Résumé B'
    },
    { 
      id: '3',
      nom: 'Ahmed Karim', 
      dateAjout: '2023-06-12', 
      ordonnance: '', 
      bilanb: 'Bilan C', 
      bilanr: '', 
      resultatsb: 'Resultats C', 
      resultatsr: 'Resultats B', 
      resume: ''
    },
  ];

  displayedColumns: string[] = ['Date', 'Ordonnance', 'Bilan', 'Resultats', 'Resume'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredConsultations: Consultation[] = [...this.consultations]; 

  consultationToUpdate: Consultation | null = null;
  ordonnanceToAdd: string = '';

  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Check if the current route matches the modal route
      this.isModalVisible = this.router.url.includes('nouvelle-ordonnance') || this.router.url.includes('affichage-ordonnance') || this.router.url.includes('resultat-bio') || this.router.url.includes('nouveau-bilan-bio') || this.router.url.includes('affichage-bilan-bio') || this.router.url.includes('resultat-radio') || this.router.url.includes('nouveau-bilan-radio') || this.router.url.includes('affichage-bilan-radio') || this.router.url.includes('nouveau-resume') || this.router.url.includes('affichage-resume') ;
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
        this.consultationToDelete.resume = '';  
      }
    }
    this.popupVisible = false; 
  }
  
  cancelDelete() {
    this.popupVisible = false;
    this.consultationToDelete = null;
  }

  openModalNouvelleOrdonnance(id: string): void {
    this.router.navigate(['nouvelle-ordonnance', id], { relativeTo: this.route });
  }

  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['affichage-ordonnance', id], { relativeTo: this.route });
  }

  openModalResultatBio(id: string): void {
    this.router.navigate(['resultat-bio', id], { relativeTo: this.route });
  }

  openModalNouveauBilanBio(id: string): void {
    this.router.navigate(['nouveau-bilan-bio', id], { relativeTo: this.route });
  }

  openModalAffichageBilanBio(id: string): void {
    this.router.navigate(['affichage-bilan-bio', id], { relativeTo: this.route });
  }

  openModalResultatRadio(id: string): void {
    this.router.navigate(['resultat-radio', id], { relativeTo: this.route });
  }

  openModalNouveauBilanRadio(id: string): void {
    this.router.navigate(['nouveau-bilan-radio', id], { relativeTo: this.route });
  }

  openModalAffichageBilanRadio(id: string): void {
    this.router.navigate(['affichage-bilan-radio', id], { relativeTo: this.route });
  }

  openModalNouveauResume(id: string): void {
    this.router.navigate(['nouveau-resume', id], { relativeTo: this.route });
  }

  openModalAffichageResume(id: string): void {
    this.router.navigate(['affichage-resume', id], { relativeTo: this.route });
  }
}
