import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardRadioComponent implements AfterViewInit {
  userName: string = 'Lyna Sili';
  nbDms: number = 10;
  nbBrs: number = 5;
  nbBrms: number = 3;

  ngAfterViewInit() {
    this.renderChart();
    this.renderBarChart();
  }

  renderChart() {
    const ctx = document.getElementById('dossierChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels (time)
        datasets: [
          {
            label: 'Dossiers Created',
            data: [12, 19, 3, 5, 2, 3, 10], // Replace with actual data
            borderColor: '#0F60FF', // Purple color
            backgroundColor: '#0F60FF09', // Semi-transparent purple
            fill: true,
            tension: 0.4, // Smooth curves
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
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Temps',
            },
          },
          y: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Nombre Bilans finalisés',
            },
          },
        },
      },
    });
  }

  renderBarChart() {
    const ctx = document.getElementById('dossierBarChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [' IRM', 'Scanner', 'Radiographie', 'échographies'], // Types dexamens
        datasets: [
          {
            label: 'Nombre',
            data: [5, 10, 8, 12], 
            backgroundColor: '#BF39FD99', 
            borderColor: '#BF39FD99',
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
            grid: {
              display: false, // Hide grid lines on the x-axis
            },
            title: {
              display: true,
              text: 'Type',
            },
          },
          y: {
            grid: {
              display: false, // Hide grid lines on the y-axis
            },
            title: {
              display: true,
              text: 'Nombre',
            },
            beginAtZero: true, // Start y-axis at zero
          },
        },
      },
    });
  } 
}