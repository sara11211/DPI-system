import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoinsService {
  private apiUrl = 'http://localhost:8000/soin'; 
  private patientIdByNssUrl = 'http://localhost:8000/patient/id';  // URL pour récupérer l'ID du patient

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer l'ID du patient à partir du NSS
  getPatientIdByNss(nss: string): Observable<any> {
    return this.http.get(`${this.patientIdByNssUrl}/${nss}/`);
  }

  // Méthode pour créer un soin
  createSoin(soinData: any) {
    return this.http.post(`${this.apiUrl}/create/`, soinData);
  }
}
