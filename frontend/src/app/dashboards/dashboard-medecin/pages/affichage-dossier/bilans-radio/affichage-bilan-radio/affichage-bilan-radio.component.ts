import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affichage-bilan-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affichage-bilan-radio.component.html',
  styleUrl: './affichage-bilan-radio.component.css'
})
export class AffichageBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 

  typeBilan: string = 'Radiographie';  
  synthese: string = 'Le patient présente des douleurs aiguës au niveau du bas du dos. Une radiographie a été réalisée pour évaluer les causes sous-jacentes.';

  typeBilanOptions: string[] = ['Radiographie', 'Scanner', 'IRM', 'Échographie'];
}