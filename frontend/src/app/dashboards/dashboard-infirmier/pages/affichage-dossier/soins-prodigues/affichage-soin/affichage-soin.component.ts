import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-affichage-soin',
  standalone: true,
  imports: [],
  templateUrl: './affichage-soin.component.html',
  styleUrl: './affichage-soin.component.css'
})

export class AffichageSoinComponent implements OnInit {
  soin: Soin = {
    nss: '',
    nomPatient: '',
    prenomPatient: '',
    dateSoin: '',
    heureSoin: '',
    typeSoin: '',
    description: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
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
}