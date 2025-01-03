import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  // Assurez-vous que l'URL d'API est correcte
  private apiUrl = 'http://localhost:8000/consultations/patient/<src:nss>/'; 

  constructor(private http: HttpClient) {}

  getConsultationsForPatient(nss: string): Observable<any[]> {
    // Remplacer <src:nss> par la valeur de nss dans l'URL
    const url = this.apiUrl.replace('<src:nss>', nss);
    return this.http.get<any[]>(url); // Envoie de la requête GET avec l'URL correcte
  }
}
