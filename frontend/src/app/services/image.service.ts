// image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:8000'; // Replace with your Django API URL

  constructor(private http: HttpClient) {}


  imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject('Failed to convert image to Base64');
        }
      };

      reader.onerror = () => {
        reject('Error reading file');
      };

      reader.readAsDataURL(file);
    });
  }

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/radios/${imageName}`, { responseType: 'blob' });
  }

}
