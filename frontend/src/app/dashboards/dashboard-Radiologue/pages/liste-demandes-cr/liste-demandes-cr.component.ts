import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Demande {
  nss: string;
  nomComplet: string;
  typeExamen: string;
  parDocteur: string;
  date: string;
  compteRendu: boolean; // True if the report exists, False otherwise
  synthese?: string; // Optional synthesis property
  dateExamen?: string; // Date when the report is completed
  resultat?: string; // Completed report result
  uploadedImages?: string[]; // List of uploaded images
}

@Component({
  selector: 'app-liste-demandes-cr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-demandes-cr.component.html',
  styleUrls: ['./liste-demandes-cr.component.css'],
})
export class ListeDemandesCRComponent implements OnInit {
  demandes: Demande[] = [
    {
      nss: '#6548',
      nomComplet: 'Joe Will',
      typeExamen: 'IRM',
      parDocteur: 'D. Joseph Wheeler',
      date: '2023-04-06',
      compteRendu: true,
      synthese: 'Synthèse pour IRM',
      dateExamen: '2023-04-07',
      resultat: 'Résultat de l\'IRM',
      uploadedImages: ['path-to-image1.jpg', 'path-to-image2.jpg'], // Example images
    },
    {
      nss: '#6549',
      nomComplet: 'Sarah Lee',
      typeExamen: 'Radiographie',
      parDocteur: 'Joseph Wheeler',
      date: '2023-04-06',
      compteRendu: false,
      synthese: 'Synthèse pour Radiographie',
    },
    {
      nss: '#6550',
      nomComplet: 'Mark Brown',
      typeExamen: 'Scanner',
      parDocteur: 'D. Joseph Wheeler',
      date: '2023-04-07',
      compteRendu: true,
      synthese: 'Synthèse pour Scanner',
      dateExamen: '2023-04-08',
      resultat: 'Résultat de Scanner',
      uploadedImages: ['path-to-image3.jpg'], // Example images
    },
  ];

  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedType: string | null = null;

  filteredDemandes: Demande[] = [...this.demandes];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Apply filters to the demandes list
  applyFilters() {
    this.filteredDemandes = this.demandes.filter((demande) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        demande.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || demande.date === this.selectedDate;
      const matchesType =
        !this.selectedType || demande.typeExamen === this.selectedType;
      return matchesSearch && matchesDate && matchesType;
    });

    this.currentPage = 1; // Reset to the first page
  }

  get paginatedDemandes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDemandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredDemandes.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  // Navigate to the "Nouveau Compte Rendu" component
  addCompteRendu(demande: Demande) {
    this.router.navigate(['nouveau-cr', demande.nss, demande.typeExamen, demande.synthese]);
  }

  // Navigate to the "Compte Rendu" component with data
  viewDetails(demande: Demande) {
    this.router.navigate(['compte-rendu', demande.nss], {
      state: {
        nss: demande.nss,
        typeExamen: demande.typeExamen,
        synthese: demande.synthese,
        dateExamen: demande.dateExamen || '',
        resultat: demande.resultat || '',
        uploadedImages: demande.uploadedImages || [],
      },
    });
  }

  // Determine CSS class based on the type of exam
  getClassByType(type: string): string {
    switch (type) {
      case 'IRM':
        return 'tag-purple';
      case 'Scanner':
        return 'tag-green';
      case 'Radiographie':
        return 'tag-blue';
      case 'Échographies':
        return 'tag-red';
      default:
        return '';
    }
  }
}
