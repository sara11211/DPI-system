import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../services/api.service';

interface Bilan {
  id : string;
  date: string;
  parDocteur: string;
  mesures: { mesure : string, valeur: string };
  typeBilan : string;
  isProcessed : boolean;
  graphData: {
    labels: string[],
    values: number[]
  };
  synthese_bilan_bio: string;
}

@Component({
  selector: 'app-historique-bilans',
  templateUrl: './historique-bilans.component.html',
  styleUrls: ['./historique-bilans.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HistoriqueBilansComponent implements OnInit {
  nss: string = '';
  nomComplet: string = '';
  origin: string = ''; // Tracks where the navigation originated from
  bilans: Bilan[] = [];
  consultation: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const state = history.state;

    if (state && state.demande.nss && state.demande.nomComplet) {
      this.nss = state.demande.nss;
      this.nomComplet = state.demande.nomComplet;
      this.consultation = state.demande.consultations;
      console.log(state.demande)
      this.apiService.getBilanPatient(state.demande.dpi).subscribe(response => {
        console.log(response);
        this.bilans = response
        console.log(this.bilans)
      });

      this.origin = state.origin || ''; // Capture the origin if provided
    } else {
      console.error('Missing state information for NSS or Nom Complet.');
    }
  }

  get paginatedBilans() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bilans.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.bilans.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }


  editBilan(bilan: any) {
    this.router.navigate(['laborantin/bilan-bio'], {
      state: {
        id: bilan.id,
        nss: this.nss,
        nomComplet: this.nomComplet,
        typeBilan: bilan.typeBilan,
        synthese: bilan.synthese_bilan_bio,
        examDate: bilan.date,
        mesures: bilan.mesures,
        graphData: bilan.graphData || null,
        consultation: this.consultation,
      },
    });
  }

  generateComparativeGraph() {
    alert('Générer un graphique comparatif avec les bilans sélectionnés.');
  }

  goBack() {
    if (this.origin === 'recherche-qr') {
      this.router.navigate(['laborantin/recherche-dossier/qr'], {
        state: {
          dossier: {
            nss: this.nss,
            name: this.nomComplet,
          },
        },
      });
    } else {
      // Default to ListeDemandesBbComponent
      this.router.navigate(['laborantin/liste-demandes-bb'], {
        state: {
          nss: this.nss,
          nomComplet: this.nomComplet,
        },
      });
    }
  }

  saveBilans() {
    alert('Bilans soumis avec succès.');
  }
}
