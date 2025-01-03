
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-bilan-bio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-bilan-bio.component.html',
  styleUrl: './modifier-bilan-bio.component.css',
})
export class ModifierBilanBioComponent implements OnInit {
  synthese: string = '';
  mesures: string[] = [''];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    // Mock data - replace with actual data loading
    this.synthese = 'Synthèse exemple';
    this.mesures = ['Mesure 1', 'Mesure 2'];
  }

  addMesure() {
    this.mesures.push('');
  }

  removeMesure(index: number) {
    this.mesures.splice(index, 1);
  }

  validateForm(): boolean {
    return (
      this.synthese.trim() !== '' &&
      this.mesures.every(mesure => mesure.trim() !== '')
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Updated bilan bio:', {
        synthese: this.synthese,
        mesures: this.mesures,
      });
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    }
  }

  annuler(): void {
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}