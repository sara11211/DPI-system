//listeOdonnace.service.ts 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Ordonnance {
  id: string;
  date: string;
  nss: string;
  etat: string;
  details: string;
}
@Injectable({
  providedIn: 'root',
})
export class OrdonnanceService {
  private apiUrl = 'http://localhost:8000/'; // Base URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer les ordonnances d'un médecin
  getOrdonnancesByMedecin(medecinId: number): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(`${this.apiUrl}ordonnances/medecin/${medecinId}/`);
  }
}
