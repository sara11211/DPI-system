import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css'],
})
export class VisualisationComponent implements AfterViewInit {
  @ViewChild('barChart')
  private chartRef!: ElementRef;
  chart: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Resultat test analyse',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

    updateChartData(newLabels: string[], newData: number[]) {
        if (this.chart) {
            this.chart.data.labels = newLabels;
            this.chart.data.datasets[0].data = newData;
            this.chart.update(); 
        }
    }
}