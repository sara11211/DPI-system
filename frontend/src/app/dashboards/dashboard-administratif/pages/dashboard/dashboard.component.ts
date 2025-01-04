import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true, 
  imports: [HttpClientModule] 
})
export class DashboardComponent implements AfterViewInit {
  numberOfDpis: number = 0; 
  constructor(private http: HttpClient) {}
  readonly httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
  ngAfterViewInit() {
    this.fetchDpiCount();
    this.fetchDossierData();
  }

    fetchDpiCount() {
      this.http.get<any[]>('http://127.0.0.1:8000/api/dpis/').subscribe(
        (response) => {
          this.numberOfDpis = response.length;
          console.log('Number of DPIs:', this.numberOfDpis);
        },
        (error) => {
          console.error('Failed to fetch DPIs:', error);
        }
      );
    }

    fetchDossierData() {
      this.http.get<any>('http://127.0.0.1:8000/api/dossier_chart/', this.httpOptions).subscribe(
        (response) => {
          const labels = response.labels;  
          const data = response.data;
          console.log("data : ", data); 
          console.log("labels : ",labels);
          this.renderChart(labels, data); 
          this.renderBarChart(labels, data);
        },
        (error) => {
          console.error('Failed to fetch chart data:', error);
        }
      );
    }
    
    renderChart(labels: string[], data: number[]) {
      const ctx = document.getElementById('dossierChart') as HTMLCanvasElement;
    
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,  // Dynamic labels from response
          datasets: [
            {
              label: 'Dossiers Created',
              data: data,  // Dynamic data from response
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
    

  renderBarChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('dossierBarChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Months
        datasets: [
          {
            label: 'Dossiers Created',
            data: data, 
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