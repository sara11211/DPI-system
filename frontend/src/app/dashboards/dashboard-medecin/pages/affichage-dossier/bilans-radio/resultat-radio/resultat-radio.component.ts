import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultat-radio',
  standalone: true,
  imports: [],
  templateUrl: './resultat-radio.component.html',
  styleUrl: './resultat-radio.component.css'
})
export class ResultatRadioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
  } 

  imageUrl: string = 'https://via.placeholder.com/150';

  downloadImage(): void {
    // Create a temporary anchor element for downloading
    const link = document.createElement('a');
    link.href = this.imageUrl;
    link.download = 'resultat-radio.png'; // Set the downloaded file name
    link.click(); // Trigger the download
  }

}
