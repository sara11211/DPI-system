import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Ordonnance {
  date: string;
  nss: string;
  etat: string;
  details: string;
}

@Component({
  selector: 'app-liste-ordonnances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-ordonnances.component.html',
  styleUrl: './liste-ordonnances.component.css'
})

export class ListeOrdonnancesComponent {
  constructor(private router: Router) {}

  ordonnances: Ordonnance[] = [
    { date: '2023-04-06', nss: '0673222612', etat: 'validee', details: 'Ordonnance A' },
    { date: '2023-05-10', nss: '0233222612', etat: 'en attente', details: 'Ordonnance B' },
    { date: '2023-06-12', nss: '0783222612', etat: 'rejetee', details: 'Ordonnance C' },
    { date: '2023-07-18', nss: '0573222712', etat: 'validee', details: 'Ordonnance D' },
    { date: '2023-08-25', nss: '0133227612', etat: 'en attente', details: 'Ordonnance E' },
  ];

  displayedColumns: string[] = ['Date', 'NSS', 'Etat', 'Details'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredOrdonnances: Ordonnance[] = [...this.ordonnances]; 

  get paginatedOrdonnances() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrdonnances.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredOrdonnances.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  applyFilters() {
    this.filteredOrdonnances = this.ordonnances.filter((ordonnance) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        ordonnance.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || ordonnance.date === this.selectedDate;
      return matchesSearch && matchesDate;
    });

    this.currentPage = 1;
  }
}
