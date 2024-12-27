import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultat-bio',
  standalone: true,
  imports: [],
  templateUrl: './resultat-bio.component.html',
  styleUrl: './resultat-bio.component.css',
})
export class ResultatBioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  }
}