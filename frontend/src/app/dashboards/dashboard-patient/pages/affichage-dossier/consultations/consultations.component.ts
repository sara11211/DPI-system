import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DownloadIconComponent } from '../../../../../../assets/icons/download-icon/download-icon.component';

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
      resume: 'Résumé A'
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
      resume: 'Résumé B'
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
  isModalVisible: boolean = false;

  filteredConsultations: Consultation[] = [...this.consultations]; // Filtered list

  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Check if the current route matches the modal route
      this.isModalVisible =
        this.router.url.includes('ordonnance') ||
        this.router.url.includes('resume') 
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
    this.consultationToDelete = consultation;
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

  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['ordonnance', id], {
      relativeTo: this.route,
    });
  }

  openModalAffichageResume(id: string): void {
    this.router.navigate(['resume', id], { relativeTo: this.route });
  }
}
