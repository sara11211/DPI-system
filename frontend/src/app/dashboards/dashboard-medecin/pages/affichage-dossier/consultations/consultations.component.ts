import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
interface Dossier {
  nom: string;
  nss: string;
  dateAjout: string;
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
  dossierToDelete: Dossier | null = null;

  dossiers: Dossier[] = [
    { nom: 'Braham Imad', nss: '0673222612', dateAjout: '2023-04-06' },
    { nom: 'Sarah Ali', nss: '0233222612', dateAjout: '2023-05-10' },
    { nom: 'Ahmed Karim', nss: '0783222612', dateAjout: '2023-06-12' },

    { nom: 'Braham Imad', nss: '0673222712', dateAjout: '2023-04-06' },
    { nom: 'Sarah Ali', nss: '0233227612', dateAjout: '2023-05-10' },
    { nom: 'Ahmed Karim', nss: '0783272612', dateAjout: '2023-06-12' },

    { nom: 'Braham Imad', nss: '0573222712', dateAjout: '2023-04-06' },
    { nom: 'Sarah Ali', nss: '0133227612', dateAjout: '2023-05-10' },
    { nom: 'Ahmed Karim', nss: '0183272612', dateAjout: '2023-06-12' },
  ];

  displayedColumns: string[] = ['Date', 'Ordonnance', 'Bilan', 'Resultats', 'Resume'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredDossiers: Dossier[] = [...this.dossiers]; // Filtered list

  constructor(public router: Router,public  route: ActivatedRoute) {}

  get paginatedDossiers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDossiers.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredDossiers.length / this.itemsPerPage);
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Apply filters
  applyFilters() {
    this.filteredDossiers = this.dossiers.filter((dossier) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        dossier.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || dossier.dateAjout === this.selectedDate;
      return matchesSearch && matchesDate;
    });

    // Reset to first page after filtering
    this.currentPage = 1;
  }

  editDossier(nss: string) {
    this.router.navigate(['/modifier-dossier', nss]);
  }

  openPopup(dossier: Dossier) {
    this.popupVisible = true;
    this.dossierToDelete = dossier;
  }
  
  confirmDelete() {
    if (this.dossierToDelete) {
      this.dossiers = this.dossiers.filter(
        (dossier) => dossier.nss !== this.dossierToDelete?.nss
      );
      this.applyFilters(); // Reapply filters after deletion
      this.popupVisible = false;
      this.dossierToDelete = null;
    }
  }
  
  cancelDelete() {
    this.popupVisible = false;
    this.dossierToDelete = null;
  }
}
