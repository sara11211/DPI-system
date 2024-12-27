import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affichage-bilan-radio',
  standalone: true,
  imports: [],
  templateUrl: './affichage-bilan-radio.component.html',
  styleUrl: './affichage-bilan-radio.component.css'
})
export class AffichageBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 
}