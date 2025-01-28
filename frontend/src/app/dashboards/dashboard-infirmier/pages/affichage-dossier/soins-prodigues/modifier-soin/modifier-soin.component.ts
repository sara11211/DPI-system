import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Soin {
  nss: string;
  nomPatient: string;
  prenomPatient: string;
  dateSoin: string;
  heureSoin: string;
  typeSoin: string;
  description: string;
}

@Component({
  selector: 'app-modification-soin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-soin.component.html',
  styleUrl: './modifier-soin.component.css'
})
export class ModifierSoinComponent implements OnInit {
  soin: Soin = {
    nss: '',
    nomPatient: '',
    prenomPatient: '',
    dateSoin: '',
    heureSoin: '',
    typeSoin: '',
    description: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Initialiser les données de soin. Remplacez ces données par une requête réelle si nécessaire.
    this.soin = {
      nss: '123456789012345',
      nomPatient: 'Doe',
      prenomPatient: 'John',
      dateSoin: '2024-01-05',
      heureSoin: '14:30',
      typeSoin: 'Administration de medicaments',
      description: 'Description détaillée du soin administré...'
    };
  }

  onSave() {
    console.log('Modifications sauvegardées:', this.soin);

    this.router.navigate(['../../../soins-prodigues'], { relativeTo: this.route });  }

  onCancel() {
    this.router.navigate(['../../../soins-prodigues'], { relativeTo: this.route });
  }
}
