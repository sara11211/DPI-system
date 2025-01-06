import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-nouveau-bb',
  templateUrl: './nouveau-bb.component.html',
  styleUrls: ['./nouveau-bb.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class NouveauBbComponent implements OnInit {
  nss: string = '';
  typeBilan: string = '';
  synthese: string = '';
  examDate: string = '';
  mesures: { mesure: string; valeur: string }[] = [
    { mesure: 'Vitamine C', valeur: '' },
    { mesure: 'Hypertension', valeur: '' },
    { mesure: 'Cholestérol', valeur: '' },
  ];
  chart: Chart | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    if (state && state.nss && state.typeBilan) {
      this.nss = state.nss;
      this.typeBilan = state.typeBilan;
      this.synthese = state.synthese || ''; // Default to empty if no synthese provided
      console.log('Received state:', state);
    } else {
      console.error('No state passed to NouveauBbComponent');
    }
  }
  

  generateGraph(): void {
    const data = this.mesures
      .filter((mesure) => mesure.valeur !== null && mesure.valeur !== undefined && mesure.valeur !== '')
      .map((mesure) => ({
        label: mesure.mesure,
        value: +mesure.valeur, // Ensure the value is numeric
      }));
  
    if (data.length > 0) {
      const labels = data.map((item) => item.label);
      const values = data.map((item) => item.value);
  
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
    } else {
      alert('Veuillez remplir les valeurs pour générer un graphique.');
    }
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
  
    if (this.mesures.some((mesure) => mesure.valeur === null || mesure.valeur === undefined || mesure.valeur === '')) {
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
        nomComplet: history.state.nomComplet, // Retrieve `nomComplet` from current state
      },
    });
  }
  

  goBack(): void {
    this.router.navigate(['/historique-bilans'], {
      state: {
        nss: this.nss,
        nomComplet: history.state.nomComplet, // Retrieve `nomComplet` from current state
      },
    });
  }
  
}
