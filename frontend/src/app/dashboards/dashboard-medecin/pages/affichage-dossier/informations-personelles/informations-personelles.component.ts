import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations-personelles',
  standalone: true,
  imports: [],
  templateUrl: './informations-personelles.component.html',
  styleUrl: './informations-personelles.component.css'
})
export class InformationsPersonellesComponent implements OnInit {
  dossierData = {
    nss: '123456789012',
    nom: 'Doe',
    prenom: 'John',
    numTel: '0123456789',
    dateNaiss: '1980-01-01',
    adresse: '123 Street, City, Country',
    medecinTraitant: '1', 
    nomContact: 'Jane Doe',
    prenomContact: 'Doe',
    numTelContact: '0987654321',
    nomMutuelle: 'HealthPlus',
    numAdherent: '5678',
    TypeCouverture: 'Complète',
  };

  medecins = [
    { id: '1', name: 'Dr. A' },
    { id: '2', name: 'Dr. B' },
    { id: '3', name: 'Dr. C' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Get the name of the doctor by their ID
  getMedecinName(id: string): string {
    const medecin = this.medecins.find((m) => m.id === id);
    return medecin ? medecin.name : 'N/A';
  }
}