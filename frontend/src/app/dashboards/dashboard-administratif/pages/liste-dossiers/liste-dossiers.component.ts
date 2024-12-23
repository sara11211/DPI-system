import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Dossier {
  nom: string;
  nss: string;
  dateAjout: string;
}

@Component({
  selector: 'app-liste-dossiers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-dossiers.component.html',
  styleUrl: './liste-dossiers.component.css'
})

export class ListeDossiersComponent {
  constructor(private router: Router
    
  ) {}
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

  displayedColumns: string[] = ['Nom', 'NSS', 'Date Ajout', 'Actions'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredDossiers: Dossier[] = [...this.dossiers]; // Filtered list

  get paginatedDossiers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDossiers.slice(startIndex, startIndex + this.itemsPerPage);
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
}