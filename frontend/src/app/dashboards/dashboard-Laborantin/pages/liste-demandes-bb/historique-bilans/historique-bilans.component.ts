import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  bilans: any[] = [
    {
      date: '2023-04-06',
      parDocteur: 'Dr. Joseph Wheeler',
      mesures: [
        { mesure: 'Vitamine C', valeur: '120' },
        { mesure: 'Cholestérol', valeur: '180' },
      ],
      typeBilan: 'Biologique',
      isProcessed: true,
      graphData: {
        labels: ['Vitamine C', 'Cholestérol'],
        values: [120, 180],
      },
    },
    {
      date: '2023-03-20',
      parDocteur: 'Dr. Emily Clark',
      mesures: [
        { mesure: 'Créatinine', valeur: '100' },
        { mesure: 'Urée', valeur: '200' },
        { mesure: 'Potassium', valeur: '30' },
      ],
      typeBilan: 'Biologique',
      isProcessed: true,
    },
    {
      date: '2023-02-14',
      parDocteur: 'Dr. Sarah Johnson',
      mesures: [
        { mesure: 'Glycémie', valeur: '' },
        { mesure: 'Insuline', valeur: '' },
      ],
      typeBilan: 'Biologique',
      isProcessed: false,
    },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;

    if (state && state.nss && state.nomComplet) {
      this.nss = state.nss;
      this.nomComplet = state.nomComplet;
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

  addBilan(bilan: any) {
    this.router.navigate(['/nouveau-bb'], {
      state: {
        nss: this.nss,
        nomComplet: this.nomComplet,
        date: bilan.date,
        parDocteur: bilan.parDocteur,
        mesures: bilan.mesures,
        typeBilan: bilan.typeBilan,
        synthese: 'Synthesis for the selected bilan',
      },
    });
  }

  editBilan(bilan: any) {
    this.router.navigate(['laborantin/bilan-bio'], {
      state: {
        nss: this.nss,
        nomComplet: this.nomComplet,
        typeBilan: bilan.typeBilan,
        synthese: 'Synthesis for the selected bilan',
        examDate: bilan.date,
        mesures: bilan.mesures,
        graphData: bilan.graphData || null,
      },
    });
  }

  generateComparativeGraph() {
    alert('Générer un graphique comparatif avec les bilans sélectionnés.');
  }

  goBack() {
    if (this.origin === 'recherche-qr') {
      this.router.navigate(['/recherche-dossier/qr'], {
        state: {
          dossier: {
            nss: this.nss,
            name: this.nomComplet,
          },
        },
      });
    } else {
      // Default to ListeDemandesBbComponent
      this.router.navigate(['/liste-demandes-bb'], {
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
