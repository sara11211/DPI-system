import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Medication {
  name: string;
  dose: string;
  duration: string;
}

@Component({
  selector: 'app-modifier-ordonnance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-ordonnance.component.html',
  styleUrl: './modifier-ordonnance.component.css'
})
export class ModifierOrdonnanceComponent implements OnInit {
  medications: Medication[] = [];
  formValid = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    // Here you  load the existing medications
    this.medications = [
      { name: 'Paracetamol', dose: '500mg', duration: '5 days' },
      { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
    ];
    this.validateForm();
  }

  addMedication() {
    this.medications.push({ name: '', dose: '', duration: '' });
    this.validateForm();
  }

  removeMedication(index: number) {
    this.medications.splice(index, 1);
    this.validateForm();
  }

  validateForm() {
    this.formValid = this.medications.every((medication) => {
      return medication.name && medication.dose && medication.duration;
    });
  }

  sauvegarder(): void {
    if (this.formValid) {
      console.log('Updated ordonnance data:', this.medications);
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });
    } else {
      console.log('Formulaire invalide, veuillez remplir tous les champs.');
    }
  }

  annuler(): void {
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}
