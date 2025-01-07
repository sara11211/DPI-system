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
  
    // Récupérer l'ordonnance par consultation ID 
   getOrdonnanceByConsultationId(consultationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}ordonnance/consultation/${consultationId}/`); // URL à ajuster en fonction de votre API
   } 
    // Télécharger ordonnance par id  :
    telechargerOrdonnance(id: number): Observable<Blob> {
        const url = `http://localhost:8000/ordonnance/word/${id}/`;
        return this.http.get(url, { responseType: 'blob' });
      }
      
    // Télécharger resumé consultation par id :
    telechargerResume(id: number): Observable<Blob> {
        const url = `http://localhost:8000/resume-consultation/${id}/word/`;
        return this.http.get(url, { responseType: 'blob' });
      }
}

