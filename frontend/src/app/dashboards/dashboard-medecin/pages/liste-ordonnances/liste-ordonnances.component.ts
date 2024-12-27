import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

interface Ordonnance {
  id: string;
  date: string;
  nss: string;
  etat: string;
  details: string;
}

@Component({
  selector: 'app-liste-ordonnances',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './liste-ordonnances.component.html',
  styleUrl: './liste-ordonnances.component.css',
})
export class ListeOrdonnancesComponent implements OnInit {
  constructor(private router: Router, public route: ActivatedRoute) {}

  isModalVisible: boolean = false;

  // note: make sure to write les etats the way they are written here to the color labels in the table, otherwise you can change the spelling but make sure to change it in the html file as well

  ordonnances: Ordonnance[] = [
    {
      id: '1',
      date: '2023-04-06',
      nss: '0673222612',
      etat: 'validee',
      details: 'Ordonnance A',
    },
    {
      id: '2',
      date: '2023-05-10',
      nss: '0233222612',
      etat: 'en attente',
      details: 'Ordonnance B',
    },
    {
      id: '3',
      date: '2023-06-12',
      nss: '0783222612',
      etat: 'rejetee',
      details: 'Ordonnance C',
    },
    {
      id: '4',
      date: '2023-07-18',
      nss: '0573222712',
      etat: 'validee',
      details: 'Ordonnance D',
    },
    {
      id: '5',
      date: '2023-08-25',
      nss: '0133227612',
      etat: 'en attente',
      details: 'Ordonnance E',
    },
  ];

  displayedColumns: string[] = ['Date', 'NSS', 'Etat', 'Details'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredOrdonnances: Ordonnance[] = [...this.ordonnances];

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isModalVisible =
        this.router.url.includes('affichage-ordonnance') 
        ;
    });
  }
  
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

  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['affichage-ordonnance', id], {
      relativeTo: this.route,
    });
  }

  closeModal() {
    this.router.navigate(['../liste-ordonnances'], { relativeTo: this.route });
  }
}
