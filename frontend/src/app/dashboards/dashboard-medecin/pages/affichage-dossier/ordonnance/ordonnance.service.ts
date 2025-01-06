import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdonnanceService {
  private apiUrl = 'http://localhost:8000/'; // URL de base de l'API

  constructor(private http: HttpClient) {}
// Récupérer l'ordonnance par consultation ID
  getOrdonnanceByConsultationId(consultationId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}ordonnance/consultation/${consultationId}/`); // URL à ajuster en fonction de votre API
 } 

 getOrdonnanceById(ordonnanceId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}ordonnance/${ordonnanceId}/`); // URL à ajuster en fonction de votre API

 }
  // Créer une ordonnance
  createOrdonnance(consultationId: number, ordonnanceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}ordonnance/create/${consultationId}/`, ordonnanceData);
  }
  
  // Créer un médicament
  createMedicament(medicamentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}medicament/create/`, medicamentData);
  }
}
