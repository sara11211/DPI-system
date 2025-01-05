import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Demande {
  nss: string;
  nomComplet: string;
  parDocteur: string;
  date: string;
}

@Component({
  selector: 'app-liste-demandes-bb',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-demandes-bb.component.html',
  styleUrls: ['./liste-demandes-bb.component.css'],
})
export class ListeDemandesBbComponent implements OnInit {
  demandes: Demande[] = [
    { nss: '0700689232923', nomComplet: 'Braham Imad', parDocteur: 'D. Joseph Wheeler', date: '2023-04-06' },
    { nss: '1234567890123', nomComplet: 'Sarah Ahmed', parDocteur: 'Dr. Sarah Taylor', date: '2023-03-15' },
    { nss: '0987654321123', nomComplet: 'John Doe', parDocteur: 'Dr. Emily Clarke', date: '2023-01-22' },
  ];

  filteredDemandes = [...this.demandes];
  searchTerm: string = '';
  selectedDate: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
    return this.filteredDemandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredDemandes.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  viewDetails(demande: Demande): void {
    this.router.navigate(['laborantin/historique-bilans'], {
      state: { nss: demande.nss, nomComplet: demande.nomComplet },
    });
  }
   

  deleteDemande(index: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette demande ?');
    if (confirmation) {
      const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.demandes.splice(globalIndex, 1);
      this.applyFilters();
      alert('Demande supprimée avec succès.');
    }
  }
}
