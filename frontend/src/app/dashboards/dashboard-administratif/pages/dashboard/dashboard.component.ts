import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
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
            display: false, // Hide legend if not necessary
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: 'Number of Dossiers',
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months
        datasets: [
          {
            label: 'Dossiers Created',
            data: [5, 10, 8, 12, 15, 7, 11], // Replace with your data
            backgroundColor: '#BF39FD99', // Purple bars
            borderColor: '#BF39FD99', // Border color for bars
            borderWidth: 1,
            borderRadius: 5, // Rounded corners
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
              text: 'Months',
            },
          },
          y: {
            grid: {
              display: false, // Hide grid lines on the y-axis
            },
            title: {
              display: true,
              text: 'Number of Dossiers',
            },
            beginAtZero: true, // Start y-axis at zero
          },
        },
      },
    });
  }
  
}
