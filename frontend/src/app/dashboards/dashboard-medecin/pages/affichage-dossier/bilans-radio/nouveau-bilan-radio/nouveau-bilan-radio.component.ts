import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nouveau-bilan-radio',
  standalone: true,
  imports: [],
  templateUrl: './nouveau-bilan-radio.component.html',
  styleUrl: './nouveau-bilan-radio.component.css'
})
export class NouveauBilanRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 
}