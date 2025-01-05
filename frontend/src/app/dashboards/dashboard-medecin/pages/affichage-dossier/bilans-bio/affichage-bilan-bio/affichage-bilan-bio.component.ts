import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-affichage-bilan-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affichage-bilan-bio.component.html',
  styleUrl: './affichage-bilan-bio.component.css'
})
export class AffichageBilanBioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiService) {}

  synthese = '';
  mesures: {mesure : string}[] = []

  ngOnInit(): void 
  {
    const consultationId = this.route.snapshot.paramMap.get('id');

    this.apiService.getbilanbioconsultation(Number(consultationId)).subscribe({
      next: (response) => {
        console.log(response);
        this.synthese = response[0].synthese_bilan_bio;
    
        console.log(this.mesures); // Verify the updated mesures array
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });

    this.apiService.getAnalyseBio(Number(consultationId)).subscribe({
      next: (response) => {
        console.log(response);
        this.mesures = [];
        this.mesures = response.map((item: any) => ({
          mesure: item.nom_analyse,
        }));
    
        console.log(this.mesures); // Verify the updated mesures array
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
    
  }

}