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
  styleUrls: ['./nouvelle-ordonnance.component.css']
})
export class NouvelleOrdonnanceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  }

  medications: Medication[] = [{ name: '', dose: '', duration: '' }];
  formValid = true;

  addMedication() {
    this.medications.push({ name: '', dose: '', duration: '' });
  }

  removeMedication(index: number) {
    this.medications.splice(index, 1);
  }

  validateForm() {
    this.formValid = this.medications.every(medication => {
      return medication.name && medication.dose && medication.duration;
    });
  }

  sauvegarder(): void {
    // Logique pour enregistrer l'ordonnance
    console.log('L\'ordonnance a été sauvegardée.');
    this.router.navigate(['../../../consultations'], { relativeTo: this.route });
  }
}
