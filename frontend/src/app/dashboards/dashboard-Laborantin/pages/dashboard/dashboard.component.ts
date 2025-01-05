import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardLaboComponent implements AfterViewInit {
  userName: string = 'Laborantin';
  nbDms: number = 15; // Example data
  nbBrs: number = 8; // Example data
  nbBrms: number = 30; // Example data

  // Example measures for prescriptions
  mesures: { mesure: string; valeur: number }[] = [
    { mesure: 'Vitamine C', valeur: 120 },
    { mesure: 'Hypertension', valeur: 140 },
    { mesure: 'Cholestérol', valeur: 200 },
  ];

  ngAfterViewInit() {
    this.renderLineChart();
    this.renderBarChart();
  }

  renderLineChart() {
    const ctx = document.getElementById('dossierChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Bilans Finalisés',
            data: [5, 8, 15, 12, 20, 25, 30],
            borderColor: '#0F60FF',
            backgroundColor: '#0F60FF09',
            fill: true,
            tension: 0.4,
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
        scales: {
          x: {
            title: { display: true, text: 'Temps' },
          },
          y: {
            title: { display: true, text: 'Bilans Finalisés' },
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderBarChart() {
    const ctx = document.getElementById('dossierBarChart') as HTMLCanvasElement;

    // Dynamically extract labels and values from the measures array
    const labels = this.mesures.map((m) => m.mesure);
    const values = this.mesures.map((m) => m.valeur);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Quantité',
            data: values,
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
            ],
            borderColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Type de Mesure',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Quantité',
            },
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
