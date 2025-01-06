import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bilan-bio',
  templateUrl: './bilan-bio.component.html',
  styleUrls: ['./bilan-bio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BilanBioComponent implements OnInit {
  nss: string = '';
  typeBilan: string = '';
  synthese: string = '';
  examDate: string = '2023-04-07';
  mesures: { mesure: string; valeur: string | null }[] = [
    { mesure: 'Vitamine C', valeur: '120' },
    { mesure: 'Hypertension', valeur: '140' },
    { mesure: 'Cholestérol', valeur: '200' },
  ];
  graphData: { labels: string[]; values: number[] } | null = null;
  isEditable: boolean = false;
  chart: Chart | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;

    if (state && state.nss && state.typeBilan && state.synthese) {
      this.nss = state.nss;
      this.typeBilan = state.typeBilan;
      this.synthese = state.synthese;
      this.examDate = state.examDate || this.getTodayDate();
      this.mesures = state.mesures || this.mesures;
      this.graphData = state.graphData || null;

      if (this.graphData) {
        this.generateGraph(this.graphData.labels, this.graphData.values);
      }
    } else {
      console.error('No state passed to BilanBioComponent');
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  enableEdit(): void {
    this.isEditable = true;
  }

  generateGraph(labels?: string[], values?: number[]): void {
    if (!labels || !values || labels.length !== values.length) {
      const data = this.mesures
        .filter((mesure) => mesure.valeur !== null && String(mesure.valeur).trim() !== '')
        .map((mesure) => ({
          label: mesure.mesure,
          value: +mesure.valeur!, // Ensure numeric values
        }));

      if (data.length > 0) {
        labels = data.map((item) => item.label);
        values = data.map((item) => item.value);
      } else {
        alert('Veuillez remplir les valeurs pour générer un graphique.');
        return;
      }
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('graphCanvas') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Résultats des tests d’analyse',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    alert('Graphique généré avec succès!');
  }

  downloadGraph(): void {
    if (this.chart) {
      const link = document.createElement('a');
      link.download = 'graphique.png';
      link.href = this.chart.toBase64Image();
      link.click();
    } else {
      alert('Aucun graphique à télécharger.');
    }
  }

  saveBilan(): void {
    if (!this.examDate || this.examDate.trim() === '') {
      alert("La date de l'examen est obligatoire.");
      return;
    }

    if (this.mesures.some((mesure) => mesure.valeur === null || String(mesure.valeur).trim() === '')) {
      alert('Veuillez remplir toutes les mesures avant de soumettre.');
      return;
    }

    console.log('Bilan saved:', {
      nss: this.nss,
      typeBilan: this.typeBilan,
      examDate: this.examDate,
      mesures: this.mesures,
    });
    alert('Bilan sauvegardé avec succès!');
    this.router.navigate(['/historique-bilans'], {
      state: {
        nss: this.nss,
        nomComplet: history.state.nomComplet,
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/historique-bilans'], {
      state: {
        nss: this.nss,
        nomComplet: history.state.nomComplet,
      },
    });
  }
}
