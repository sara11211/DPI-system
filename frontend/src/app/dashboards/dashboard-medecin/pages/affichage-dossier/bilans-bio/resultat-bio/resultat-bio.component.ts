import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultat-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat-bio.component.html',
  styleUrl: './resultat-bio.component.css',
})
export class ResultatBioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  }

  resultats = [
    { mesure: 'Glucose', value: '100 mg/dL' },
    { mesure: 'Hemoglobin', value: '13.5 g/dL' },
    { mesure: 'Cholesterol', value: '180 mg/dL' },
    { mesure: 'Calcium', value: '9.8 mg/dL' },
  ];
}