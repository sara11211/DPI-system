import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Dossier {
  nom: string;
  prenom :string;
  nss: string;
  users_id: BigInteger;
  dateAjout: string;
}


@Component({
  selector: 'app-liste-dossiers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './liste-dossiers.component.html',
  styleUrl: './liste-dossiers.component.css',
})
export class ListeDossiersComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  popupVisible: boolean = false;
  dossierToDelete: Dossier | null = null;


  dossiers: Dossier[] = [];
  displayedColumns: string[] = ['Nom', 'Prenom', 'NSS', 'Date Ajout', 'Actions'];

  itemsPerPage = 8;
  currentPage = 1;
  searchTerm: string = '';
  selectedDate: string | null = null;

  filteredDossiers: Dossier[] = [...this.dossiers]; // Filtered list


  ngOnInit(): void {
    this.fetchDossiers();
  }

  readonly endpointFetchDossiers = 'http://127.0.0.1:8000/api/dpis/';
  fetchDossiers() {
    this.http.get<any[]>(this.endpointFetchDossiers).subscribe(
      (data) => {
        this.dossiers = data;
        this.fetchUserDatesForDossiers();
      },
      (error) => {
        console.error('Failed to fetch dossiers:', error);
      }
    );
  }
  fetchUserDatesForDossiers() {
    const userPromises = this.dossiers.map((dossier) => {
      return this.http
        .get<any>(`http://127.0.0.1:8000/api/users/${dossier.users_id}/`)
        .toPromise()
        .then((userData) => {
          return {
            nom: dossier.nom,
            prenom: dossier.prenom,
            nss: dossier.nss.toString(),
            dateAjout: this.formatDate(userData.date_joined), 
            users_id: dossier.users_id
          };
        });
    });
  
    Promise.all(userPromises)
      .then((dossiersWithDate) => {
        this.dossiers = dossiersWithDate;
        this.filteredDossiers = [...this.dossiers]; 
      })
      .catch((error) => {
        console.error('Failed to fetch user dates:', error);
      });
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-GB');  
  }

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

  applyFilters() {
    this.filteredDossiers = this.dossiers.filter((dossier) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        dossier.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const matchesDate =
        !this.selectedDate ||
        this.normalizeDate(dossier.dateAjout) === this.selectedDate;
  
      return matchesSearch && matchesDate;
    });
  }
  
  normalizeDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`; 
  }
  editDossier(nss: string) {
    this.router.navigate(['/admin/modifier-dossier', nss]);
  }

  openPopup(dossier: Dossier) {
    this.popupVisible = true;
    this.dossierToDelete = dossier;
  }

    readonly endpointDeleteDPI = 'http://127.0.0.1:8000/api/dpis/';
    confirmDelete() {
      if (this.dossierToDelete) {
        this.http.delete(`${this.endpointDeleteDPI}${this.dossierToDelete.nss}/delete/`)
          .subscribe(
            () => {
              this.dossiers = this.dossiers.filter(
                (dossier) => dossier.nss !== this.dossierToDelete?.nss
              );
              this.applyFilters(); 
              this.popupVisible = false;
              this.dossierToDelete = null;
            },
            (error) => {
              console.error('Failed to delete dossier:', error);
              alert('Failed to delete the dossier. Please try again.');
            }
          );
      }
    }
      
  cancelDelete() {
    this.popupVisible = false;
    this.dossierToDelete = null;
  }
  
}