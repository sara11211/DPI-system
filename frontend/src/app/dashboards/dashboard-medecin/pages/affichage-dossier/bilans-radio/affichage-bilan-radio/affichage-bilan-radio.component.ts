import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-affichage-bilan-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affichage-bilan-radio.component.html',
  styleUrl: './affichage-bilan-radio.component.css'
})
export class AffichageBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,private apiService: ApiService) {}
  typeBilan: string = '';  
  synthese: string = '';
  
  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');

    this.apiService.getbilanconsultation(Number(consultationId)).subscribe((data) => {
      this.typeBilan = data[0].type_radiologie;
      this.synthese = data[0].synthese_bilan_radio;
    });
  } 

  typeBilanOptions: string[] = ['Radiographie', 'Scanner', 'IRM', 'Échographie'];
}