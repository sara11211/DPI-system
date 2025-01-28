import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdonnanceService } from './listeOrdonnance.service'; // Importation du service
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../login/auth.service';

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
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListeOrdonnancesComponent implements OnInit {

  ordonnances: Ordonnance[] = []; // Liste des ordonnances récupérées
  displayedColumns: string[] = ['Date', 'NSS', 'Etat', 'Details'];
  itemsPerPage = 7;
  currentPage = 1;
  searchTerm: string = ''; // Critère de recherche par NSS
  selectedDate: string | null = null; // Critère de filtre par date
  filteredOrdonnances: Ordonnance[] = []; // Ordonnances filtrées
  isModalVisible: boolean = false; // Modal de détails


  mapEtat(etat: string): string {
    switch (etat) {
      case 'Validee':
        return 'Validée';
      case 'En cours de validation':
        return 'En attente';
      case 'Refusee':
        return 'Rejetée';
      default:
        return 'En attente'; // Par défaut, on considère l'état comme "En attente".
    }
  }
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordonnanceService: OrdonnanceService, // Service injecté
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const medecinId = this.authService.getUser().id; // ID du médecin (à récupérer dynamiquement si nécessaire)
    this.loadOrdonnancesByMedecin(medecinId);
    this.router.events.subscribe(() => {
      this.isModalVisible =
        this.router.url.includes('affichage-ordonnance') 
        ;
    });
  }

  /**
   * Charger les ordonnances d'un médecin via le service
   * @param medecinId - ID du médecin
   */
  loadOrdonnancesByMedecin(medecinId: number): void {
    this.ordonnanceService.getOrdonnancesByMedecin(medecinId).subscribe(
      (ordonnances) => {
        // Affichage détaillé des ordonnances et de leur état
        console.log("Ordonnances reçues :", ordonnances);
        
        // Vérifier si l'état est bien inclus pour chaque ordonnance
        ordonnances.forEach((ordonnance, index) => {
          console.log(`Ordonnance ${index + 1} - Etat: ${ordonnance.etat}`);
        });
        
        this.ordonnances = ordonnances; // Assigner les ordonnances récupérées
        this.filteredOrdonnances = [...this.ordonnances]; // Initialiser les ordonnances filtrées
      },
      (error) => {
        console.error('Erreur lors de la récupération des ordonnances', error);
      }
    );
  }
  

  /**
   * Appliquer les filtres pour la recherche et la date
   */
  applyFilters(): void {
    this.filteredOrdonnances = this.ordonnances.filter((ordonnance) => {
      const matchesSearch =
        !this.searchTerm ||
        ordonnance.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || ordonnance.date === this.selectedDate;
      return matchesSearch && matchesDate;
    });
    this.currentPage = 1; // Réinitialiser la page à 1 après chaque filtre
  }

  /**
   * Récupérer les ordonnances paginées
   */
  get paginatedOrdonnances() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrdonnances.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /**
   * Calculer le nombre total de pages
   */
  get totalPages() {
    return Math.ceil(this.filteredOrdonnances.length / this.itemsPerPage);
  }

  /**
   * Changer de page pour la pagination
   * @param page - Numéro de la page cible
   */
  changePage(page: number) {
    this.currentPage = page;
  }

  /**
   * Ouvrir le modal pour afficher les détails d'une ordonnance
   * @param id - ID de l'ordonnance
   */
  openModalAffichageOrdonnance(id: string): void {
    this.router.navigate(['affichage-ordonnance', id], {
      relativeTo: this.route,
    });
  }

  /**
   * Fermer le modal et revenir à la liste des ordonnances
   */
  closeModal() {
    this.router.navigate(['../liste-ordonnances'], { relativeTo: this.route });
  }
}
