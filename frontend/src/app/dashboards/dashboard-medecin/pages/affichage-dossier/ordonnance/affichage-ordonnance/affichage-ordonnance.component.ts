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
  medicaments: { nom_medicament: string; dose: string; duree: string }[] = []; // Liste des médicaments associés à l'ordonnance
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordonnanceService: OrdonnanceService // Injecter le service
  ) {}

  ngOnInit(): void {
    let consultationId = null;
    let ordonnanceId = null;
    if (this.router.url.includes('consultations')) {
      
    consultationId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de la consultation dans l'URL
    console.log('Consultation ID:', consultationId);
    } else {
      
    ordonnanceId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de la consultation dans l'URL
    console.log('ordonnance ID:', ordonnanceId);

      // Logic spécifique pour les autres cas
    }
    //const ordonnanceId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de la consultation dans l'URL
    //console.log('Consultation ID:', ordonnanceId);
    
    if (consultationId) {
      // Récupérer l'ordonnance associée à la consultation
      this.ordonnanceService.getOrdonnanceByConsultationId(Number(consultationId)).subscribe(
        (data) => {
          console.log('Ordonnance récupérée par consultation ID:', data);
          
          // Ici, vous récupérez l'ID de l'ordonnance dans la réponse
          if (data && data.ordonnance_id) {
            const ordonnanceId = data.ordonnance_id; // Récupérer l'ID de l'ordonnance
            console.log('Ordonnance ID:', ordonnanceId);
            
            // Appeler la méthode pour récupérer l'ordonnance complète en utilisant l'ID de l'ordonnance
            this.ordonnanceService.getOrdonnanceById(ordonnanceId).subscribe(
              (ordonnanceData) => {
                console.log('Détails de l\'ordonnance récupérés:', ordonnanceData);
                this.ordonnance = ordonnanceData; // Stocker les détails de l'ordonnance
                this.medicaments = this.ordonnance.medicaments || []; // Récupérer les médicaments associés à l'ordonnance
              },
              (error) => {
                console.error('Erreur lors de la récupération des détails de l\'ordonnance:', error);
              }
            );
          } else {
            console.error('ID de l\'ordonnance non trouvé dans la réponse');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'ordonnance associée à la consultation:', error);
        }
      );
    } else {

      if(ordonnanceId){
        // Appeler la méthode pour récupérer l'ordonnance complète en utilisant l'ID de l'ordonnance
        this.ordonnanceService.getOrdonnanceById(Number(ordonnanceId)).subscribe(
          (ordonnanceData) => {
            console.log('Détails de l\'ordonnance récupérés:', ordonnanceData);
            this.ordonnance = ordonnanceData; // Stocker les détails de l'ordonnance
            this.medicaments = this.ordonnance.medicaments || []; // Récupérer les médicaments associés à l'ordonnance
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'ordonnance:', error);
          }
        );
      }
    }
  }
}
