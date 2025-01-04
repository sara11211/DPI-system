import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../../components/utilities/button/button.component';
import { ModifierInfoComponent } from './modifier/modifier.component';

@Component({
  selector: 'app-informations-personelles',
  standalone: true,
  imports: [ButtonComponent,ModifierInfoComponent,RouterOutlet, CommonModule],
  templateUrl: './informations-personelles.component.html',
  styleUrl: './informations-personelles.component.css'
})
export class InformationsPersonellesPatientComponent implements OnInit {
  dossierData = {
    nom: 'Braham Imad',
        prenom: 'Imad',
        nss: '0673222612',
        numTel: '0555222612',
        dateNaiss: '1990-02-14',
        adresse: 'Algiers, Algeria',
        medecinTraitant: 'Dr. A',
        nomContact: 'Samira Imad',
        prenomContact: 'Samira',
        numTelContact: '0555222613',
        nomMutuelle: 'Mutuelle Sante',
        numAdherent: 'MS12345',
        TypeCouverture: 'Complète',
        dateAjout: '2023-04-06',
  };

  medecins = [
    { id: '1', name: 'Dr. A' },
    { id: '2', name: 'Dr. B' },
    { id: '3', name: 'Dr. C' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const nss = this.route.snapshot.paramMap.get('nss');
  }

  // Get the name of the doctor by their ID
  getMedecinName(id: string): string {
    const medecin = this.medecins.find((m) => m.id === id);
    return medecin ? medecin.name : 'N/A';
    const  nss = this.route.snapshot.paramMap.get('nss');
  }

  isRouteActive(route: string): boolean {
    return this.router.url.split('/').pop() === route;
  }
  


  modify(){
    // Navigate to modify
    this.router.navigate(['modifier'], { relativeTo: this.route});
  }
}