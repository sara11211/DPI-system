import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affichage-ordonnance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affichage-ordonnance.component.html',
  styleUrl: './affichage-ordonnance.component.css',
})
export class AffichageOrdonnanceComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  }

  medications: { name: string; dose: string; duration: string }[] = [
    { name: 'Paracetamol', dose: '500mg', duration: '5 days' },
    { name: 'Amoxicillin', dose: '250mg', duration: '7 days' },
  ];
}
