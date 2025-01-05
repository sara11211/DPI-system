import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../services/api.service';

@Component({
  selector: 'app-resultat-radio',
  standalone: true,
  imports: [],
  templateUrl: './resultat-radio.component.html',
  styleUrl: './resultat-radio.component.css'
})
export class ResultatRadioComponent implements OnInit {

  imageBase64: string = '';
  consultation : string | null = '';

  constructor(private route: ActivatedRoute, private router: Router, private apiService:ApiService) {}

  ngOnInit(): void {
    // Retrieve the consultation ID from the route parameters
    const consultationId = this.route.snapshot.paramMap.get('id');
    this.consultation = consultationId;

    this.apiService.get_image(Number(consultationId)).subscribe((data) => {
      console.log(data);
      console.log('fof');
      this.imageBase64 = data.image_base64;
    });

  } 
  downloadImage(): void {
    if (!this.imageBase64) {
      console.error('No image data available for download.');
      return;
    }

    // Convert Base64 string to a Blob
    const base64Data = this.imageBase64.split(',')[1]; // Remove the data prefix
    const binaryData = atob(base64Data);
    const byteArray = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'image/png' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resultat_bilanradio_'+this.consultation+'.png';
    link.click();
  }

}
