import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-resultat-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat-bio.component.html',
  styleUrl: './resultat-bio.component.css',
})
export class ResultatBioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private apiService:ApiService) {}


  resultats: {mesure : string, value: string, unite : string}[] = []

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');

    this.apiService.getAnalyseBio(Number(consultationId)).subscribe({
      next: (response) => {
        console.log(response);
        this.resultats = [];
        this.resultats = response.map((item: any) => ({
          mesure: item.nom_analyse,
          value: item.quantite,
          unite: item.unite,
        }));
    
        console.log(this.resultats); // Verify the updated mesures array
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });

  }

  
}