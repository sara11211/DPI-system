import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private createUrl = 'http://localhost:8000/consultation/create/'; // URL de l'API pour créer une consultation
  private getUrl = 'http://localhost:8000/consultations/'; // URL de l'API pour obtenir les consultations

  constructor(private http: HttpClient) {}

  // Méthode pour créer une consultation
  createConsultation(consultationData: any): Observable<any> {
    return this.http.post(this.createUrl, consultationData);
  }

  // Méthode pour récupérer les consultations d'un patient
  getConsultationsByPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.getUrl}?patient_id=${patientId}`);  // Requête GET avec ID du patient
  }
}
