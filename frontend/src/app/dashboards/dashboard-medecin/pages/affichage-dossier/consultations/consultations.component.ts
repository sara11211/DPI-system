import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  imports: [CommonModule],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class ConsultationsComponent {
  popupVisible: boolean = false;
  deleteType: string = '';
  consultationToDelete: Consultation | null = null;

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

  openPopup(type: string, consultation: Consultation) {
    this.deleteType = type;  // Save whether we're dealing with ordonnance or resume
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

  navigateToOrdonnance(id: string): void {
    this.router.navigate(['/nouvelle-ordonnance', id]);
  }
}
