import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 

  symptoms: string = 'Exemple de symptômes déjà renseignés';
  diagnostic: string = 'Exemple de diagnostic déjà renseigné';
  measuresInfo: string = 'Exemple des informations sur les mesures déjà renseignées';
  nextConsultation: string = '2024-12-31';
}