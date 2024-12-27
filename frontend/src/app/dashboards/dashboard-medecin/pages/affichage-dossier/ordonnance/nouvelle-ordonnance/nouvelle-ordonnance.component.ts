import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Medication {
  name: string;
  dose: string;
  duration: string;
}

@Component({
  selector: 'app-nouvelle-ordonnance',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nouvelle-ordonnance.component.html',
  styleUrls: ['./nouvelle-ordonnance.component.css'],
})
export class NouvelleOrdonnanceComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  }

  medications: Medication[] = [{ name: '', dose: '', duration: '' }];
  formValid = false;

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
      console.log('Ordonnance data:', this.medications); // Log medication data

      // Navigate back - Adjust the route as needed for your application
      this.router.navigate(['../../../consultations'], { relativeTo: this.route });

    } else {
      console.log('Formulaire invalide, veuillez remplir tous les champs.');
    }
  }
}
