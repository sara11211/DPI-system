import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

interface Demande {
  id:string;
  nss: string;
  nomComplet: string;
  type_radiologie: string;
  parDocteur: string;
  date: string;
  synthese_bilan_radio?: string; // Optional synthesis property
  date_radiologie?: string; // Date when the report is completed
  resultat?: string; // Completed report result
  image_url?: string; // List of uploaded images
  consultations?: string;
}

@Component({
  selector: 'app-liste-demandes-cr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-demandes-cr.component.html',
  styleUrls: ['./liste-demandes-cr.component.css'],
})
export class ListeDemandesCRComponent implements OnInit {
  demandes: Demande[] = []

  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedType: string | null = null;

  filteredDemandes: Demande[] = [...this.demandes];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // diplay demands
    this.apiService.getBilanRadio().subscribe(response => {
      this.demandes = response
      console.log(this.demandes)
    });
  }


  // Apply filters to the demandes list
  applyFilters() {
    this.filteredDemandes = this.demandes.filter((demande) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        demande.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || demande.date === this.selectedDate;
      const matchesType =
        !this.selectedType || demande.type_radiologie === this.selectedType;
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

  addCompteRendu(demande: Demande) {
    this.router.navigate(['radiologue/nouveau-cr',demande.consultations], {
      queryParams: {
        id: demande.id,
        nss: demande.nss,
        type_radiologie: demande.type_radiologie,
        synthese_bilan_radio: demande.synthese_bilan_radio, 
        date_radiologie: demande.date_radiologie, 
        resultat: demande.resultat,
        image_url: demande.image_url,
        consultations: demande.consultations,
      }
    });
  }
  

  

  // Navigate to the "Compte Rendu" component with data
  viewDetails(demande: Demande) {
    console.log(demande)
    this.router.navigate(['radiologue/compte-rendu',demande.consultations], {
      queryParams: {
        id: demande.id,
        nss: demande.nss,
        type_radiologie: demande.type_radiologie,
        synthese_bilan_radio: demande.synthese_bilan_radio, 
        date_radiologie: demande.date_radiologie, 
        resultat: demande.resultat,
        image_url: demande.image_url,
        consultations: demande.consultations,
      }
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
        return 'tag-yellow';
    }
  }
}
