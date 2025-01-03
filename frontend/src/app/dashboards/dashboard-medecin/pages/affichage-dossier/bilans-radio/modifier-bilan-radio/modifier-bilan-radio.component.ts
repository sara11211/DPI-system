// modifier-bilan-radio.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-bilan-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-bilan-radio.component.html',
  styleUrl: './modifier-bilan-radio.component.css',
})
export class ModifierBilanRadioComponent implements OnInit {
  typeBilan: string = '';
  synthese: string = '';
  typeBilanOptions: string[] = [
    'Radiographie',
    'Scanner',
    'IRM',
    'Échographie',
    'Mammographie',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    // Mock data - replace with actual data loading
    this.typeBilan = 'Scanner';
    this.synthese = 'Synthèse exemple';
  }

  validateForm(): boolean {
    return this.typeBilan.trim() !== '' && this.synthese.trim() !== '';
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Updated bilan radio:', {
        typeBilan: this.typeBilan,
        synthese: this.synthese,
      });
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    }
  }

  annuler(): void {
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}