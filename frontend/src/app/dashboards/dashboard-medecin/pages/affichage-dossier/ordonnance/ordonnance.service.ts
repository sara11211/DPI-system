import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient
import { Observable } from 'rxjs'; // Pour gérer les observables

@Injectable({
  providedIn: 'root',
})
export class OrdonnanceService {
  private apiUrl = 'http://localhost:8000/ordonnance'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  // Obtenir une ordonnance par ID
  getOrdonnance(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`); // Utilicd sation de l'URL GET pour l'ordonnance
  }

  // Créer une ordonnance
  createOrdonnance(consultationId: number, ordonnanceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${consultationId}/`, ordonnanceData); // POST pour créer une ordonnance
  }

  // Mettre à jour une ordonnance
  updateOrdonnance(id: number, ordonnanceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}/`, ordonnanceData); // PUT pour mettre à jour
  }

  // Supprimer une ordonnance
  deleteOrdonnance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}/`); // DELETE pour supprimer une ordonnance
  }

  // Valider une ordonnance
  validerOrdonnance(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/valider/${id}/`); // GET pour valider une ordonnance
  }

  // Télécharger l'ordonnance en format Word
  downloadOrdonnanceWord(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/word/${id}/`, { responseType: 'blob' }); // GET pour télécharger en format Word
  }
}
