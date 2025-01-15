import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

interface Demande {
  id:string;
  nss: string;
  nomComplet: string;
  parDocteur: string;
  date: string;
  synthese_bilan_bio?: string; // Optional synthesis property
  date_bilan?: string; // Date when the report is completed
  consultations?: string;
  dpi: string;
}

@Component({
  selector: 'app-liste-demandes-bb',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-demandes-bb.component.html',
  styleUrls: ['./liste-demandes-bb.component.css'],
})
export class ListeDemandesBbComponent implements OnInit {
  demandes: Demande[] = [];

  filteredDemandes = [...this.demandes];
  searchTerm: string = '';
  selectedDate: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    // diplay demands
    this.apiService.getBilanBio().subscribe(response => {
      this.demandes = response
      console.log(this.demandes)
    });
  }
  applyFilters(): void {
    this.filteredDemandes = this.demandes.filter((demande) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        demande.nss.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      const matchesDate = !this.selectedDate || demande.date === this.selectedDate;
      return matchesSearch && matchesDate;
    });
  }

  get paginatedDemandes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.demandes
    //return this.filteredDemandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredDemandes.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  viewDetails(demande: Demande): void {
    this.router.navigate(['laborantin/historique-bilans'], {
      state: { demande : demande },
    });
  }
   

  deleteDemande(index: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette demande ?');
    if (confirmation) {
      const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.demandes.splice(globalIndex, 1);
      this.applyFilters();
      this.apiService.deleteBilanBio(Number(this.demandes.splice(globalIndex, 1)[0].id)).subscribe(response => {
        this.demandes = response
        alert('Demande supprimée avec succès.');
      });
    }
  }
}
