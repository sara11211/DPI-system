import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private apiUrl = 'http://localhost:8000/';  // Remplacez par votre URL API backend

  constructor(private http: HttpClient) {}

  // Méthode pour créer un résumé de consultation
   createResumeConsultation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resume-consultation/create/`, data);
  }

   
  // Méthode pour récupérer le résumé de consultation à partir de l'ID de la consultation
   getResumeConsultationByConsultationId(consultationId: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resume-consultation/${consultationId}/`);
  }

}
