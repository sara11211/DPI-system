import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-nouveau-bilan-bio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nouveau-bilan-bio.component.html',
  styleUrl: './nouveau-bilan-bio.component.css'
})
export class NouveauBilanBioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  synthese: string = '';
  mesures: string[] = [''];

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
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
      this.mesures.every((mesure) => mesure.trim() !== '')
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted successfully');
      console.log('Synthese:', this.synthese);
      console.log('Mesures:', this.mesures);
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    } else {
      console.log('Form is invalid. Please fill out all fields.');
    }
  }
}
