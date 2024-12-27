import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affichage-bilan-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affichage-bilan-bio.component.html',
  styleUrl: './affichage-bilan-bio.component.css'
})
export class AffichageBilanBioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 
  synthese = 'Résumé de synthèse ici. Exemples : Glucose élevé, cholestérol normal.';
  mesures = [
    { mesure: 'Glucose' },
    { mesure: 'Hemoglobin'},
    { mesure: 'Cholesterol'},
    { mesure: 'Calcium'},
    { mesure: 'Urea' },
  ];
}
