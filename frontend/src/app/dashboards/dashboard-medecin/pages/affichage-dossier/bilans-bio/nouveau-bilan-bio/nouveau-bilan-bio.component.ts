import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, debounceTime } from 'rxjs';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-nouveau-bilan-bio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-bilan-bio.component.html',
  styleUrl: './nouveau-bilan-bio.component.css'
})
export class NouveauBilanBioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,private apiService:ApiService) {}

  synthese: string = '';
  mesures: string[] = [''];
  consultationId : string | null = '';

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    this.consultationId = consultationId;
  }

  addMesure() {
    this.mesures.push('');
  }

  removeMesure(index: number) {
    this.mesures.splice(index, 1);
  }

  validateForm(): boolean {
    return (
      this.synthese.trim() !== '' && 
      this.mesures.every((mesure) => mesure.trim() !== '')
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      let data = {
        "synthese_bilan_bio" : this.synthese,
        "consultations" : this.consultationId,
      }
      console.log('Form submitted successfully');
      console.log('Synthese:', this.synthese);
      console.log('Mesures:', this.mesures);

      this.apiService.postBilanBio(data).subscribe({
        next: (response) => {

          this.mesures.forEach((element, index, array) => {
            let analyse = {
              "nom_analyse" : element,
              "bilan_biologique" : response.id
            }
            console.log(analyse)
            this.apiService.postAnalyseBio(analyse).subscribe({
              next: (response) => {
                console.log('analyses sauvegardées avec succès !');
              },
              error: (error) => {
                console.log('Une erreur s\'est produite.');
              }
            });
          });

          alert('bilan biologique sauvegardé avec succès !');
        },
        error: (error) => {
          alert('Une erreur s\'est produite.');
        }
      });

      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    } else {
      console.log('Form is invalid. Please fill out all fields.');
    }
  }
}
