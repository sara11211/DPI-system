import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

interface Graphique {
  name: string;
  nss: string;
  type: string;
  date: string;
}

@Component({
  selector: 'app-historique-graphiques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique-graphiques.component.html',
  styleUrls: ['./historique-graphiques.component.css'],
})
export class HistoriqueGraphiquesComponent implements OnInit {
  graphiques: Graphique[] = [
    {
      name: 'Braham Imad',
      nss: '0700689323923',
      type: 'Simple',
      date: '6 April 2023',
    },
    {
      name: 'Braham Imad',
      nss: '0700689323923',
      type: 'Comparatif',
      date: '3 April 2023',
    },
  ];

  searchTerm: string = '';
  selectedDate: string | null = null;
  selectedType: string | null = null;
  filteredGraphiques: Graphique[] = [...this.graphiques];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  selectedGraphique: Graphique | null = null;
  chartInstance: Chart | null = null;

  ngOnInit(): void {}

  applyFilters() {
    this.filteredGraphiques = this.graphiques.filter((graphique) => {
      const matchesSearch =
        this.searchTerm.trim() === '' ||
        graphique.nss.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate =
        !this.selectedDate || graphique.date === this.selectedDate;
      const matchesType =
        !this.selectedType || graphique.type === this.selectedType;
      return matchesSearch && matchesDate && matchesType;
    });

    this.currentPage = 1;
  }

  get paginatedGraphiques() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredGraphiques.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredGraphiques.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  viewDetails(graphique: Graphique) {
    this.selectedGraphique = graphique;

    // Render the graph in the modal
    setTimeout(() => {
      const ctx = document.getElementById(
        'notificationGraph'
      ) as HTMLCanvasElement;

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Vitamine C', 'Hypertension', 'Cholestérol'],
          datasets: [
            {
              label: graphique.type,
              data: [120, 140, 200], // Example data
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }, 0);
  }

  closeDetails() {
    this.selectedGraphique = null;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  downloadGraph() {
    if (this.chartInstance) {
      const link = document.createElement('a');
      link.download = `${this.selectedGraphique?.name}_graphique.png`;
      link.href = this.chartInstance.toBase64Image();
      link.click();
    }
  }

  getClassByType(type: string): string {
    return type === 'Simple' ? 'tag-blue' : 'tag-purple';
  }
}
