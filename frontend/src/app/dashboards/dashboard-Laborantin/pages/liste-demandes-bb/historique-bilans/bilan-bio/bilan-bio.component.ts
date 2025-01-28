import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ApiService } from '../../../../../../services/api.service';
import { AuthService } from '../../../../../../login/auth.service';

@Component({
  selector: 'app-bilan-bio',
  templateUrl: './bilan-bio.component.html',
  styleUrls: ['./bilan-bio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BilanBioComponent implements OnInit {

  id : string = '';
  nss: string = '';
  typeBilan: string = '';
  synthese: string = '';
  examDate: string = '';
  dpi: string = '';
  mesures: { id: number; mesure: string; valeur: number | null }[] = [];
  graphData: { labels: string[]; values: number[] } | null = null;
  isEditable: boolean = false;
  chart: Chart | null = null;

  constructor(private router: Router, private apiService: ApiService, private authservice : AuthService) {}

  ngOnInit(): void {

    const state = history.state;
    console.log('this is the state ',state,'piw')
    if (state && state.nss && state.synthese) {
      this.id = state.id;
      this.nss = state.nss;
      this.typeBilan = 'Biologique';
      this.synthese = state.synthese;
      this.examDate = state.examDate || this.getTodayDate();
      this.dpi = state.dpi;

      
      this.apiService.getAnalyseBio(Number(state.consultation)).subscribe(response => {
        response.forEach((element : { id:string, nom_analyse: string, quantite:string }, index : number) => {
          if (!this.mesures[index]) {
            this.mesures[index] = { id: 0, mesure: '', valeur: 0 };
          }
          this.mesures[index].mesure = element.nom_analyse;
          this.mesures[index].valeur = Number(element.quantite);
          this.mesures[index].id = Number(element.id);
        });
      });

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
        animation: {
          onComplete: () => {
            const base64Image = ctx.toDataURL('image/png'); 
  
            console.log(base64Image);
            
            const formData = new FormData();
            formData.append('image', base64Image);  // Send the base64 image
            formData.append('id_laborantin', this.authservice.getUser().id);  // Example ID, replace with actual value
            formData.append('id_dpis', this.dpi);       // Example ID
            formData.append('id_bilan', this.id);      // Example ID
            formData.append('date', this.examDate);   // Example date
            formData.append('type_graphe', 'simple'); // Example type
  
            console.log(this.dpi);
            this.apiService.postImageGraphique(formData).subscribe(response => {
              console.log("Graphique saved successfully");
            });
          
            alert('Graphique généré avec succès!');
          },
        },
      },
    });
  
    // Call update to ensure any changes to the chart are applied
    this.chart.update();
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

    if (this.mesures.some((mesure) => mesure.valeur === 0)) {
      alert('Veuillez remplir toutes les mesures avant de soumettre.');
      return;
    }

    console.log('Bilan saved:', {
      nss: this.nss,
      typeBilan: this.typeBilan,
      examDate: this.examDate,
      mesures: this.mesures,
    });

    let data;

    this.mesures.forEach((element : { id: number; mesure: string; valeur: number | null; } , index : number) => {
      data = {
        quantite : element.valeur
      }
      this.apiService.putAnalyseBio(element.id,data).subscribe(response => {
        console.log(response);
    });
    });


    alert('Bilan sauvegardé avec succès!');
    // this.router.navigate(['laborantin/historique-bilans'], {
    //   state: {
    //     nss: this.nss,
    //     nomComplet: history.state.nomComplet,
    //   },
    // });
    window.history.back();
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
