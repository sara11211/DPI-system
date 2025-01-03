import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdonnanceService } from '../ordonnance.service'; // Importer le service

@Component({
  selector: 'app-affichage-ordonnance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affichage-ordonnance.component.html',
  styleUrls: ['./affichage-ordonnance.component.css'],
})
export class AffichageOrdonnanceComponent implements OnInit {
  
  ordonnance: any = null; // Pour stocker les détails de l'ordonnance
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordonnanceService: OrdonnanceService // Injecter le service
  ) {}
  medicaments: { nom_medicament: string; dose: string; duree: string }[] = [];

  ngOnInit(): void {
    const ordonnanceId = this.route.snapshot.paramMap.get('id');
    console.log('Ordonnance ID:', ordonnanceId);
    
    if (ordonnanceId) {
      this.ordonnanceService.getOrdonnance(Number(ordonnanceId)).subscribe((data) => {
        this.ordonnance = data;
        this.medicaments = this.ordonnance.medicaments;  // Assurez-vous que la structure est correcte
        console.log('Ordonnance récupérée:', this.ordonnance);
      });
    } else {
      console.error('ID de l\'ordonnance non trouvé');
    }
  }
  
}
