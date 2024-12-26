import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class ConsultationsComponent {
  popupVisible: boolean = false;
  consultationToDelete: Consultation | null = null;

  // Updated array with example consultation data
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

  // Updated displayed columns for consultations
  displayedColumns: string[] = ['Date', 'Ordonnance', 'Bilan', 'Resultats', 'Resume'];

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

  openPopup(consultation: Consultation) {
    this.popupVisible = true;
    this.consultationToDelete = consultation;
  }
  
  confirmDelete() {
    if (this.consultationToDelete) {
      this.consultations = this.consultations.filter(
        (consultation) => consultation.nss !== this.consultationToDelete?.nss
      );
      this.applyFilters(); // Reapply filters after deletion
      this.popupVisible = false;
      this.consultationToDelete = null;
    }
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
}
