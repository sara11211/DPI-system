import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; //Base abckend url

  constructor(private http: HttpClient) { }

  ////////////////////////////////////////////////////////////////////////////
  //bilan radiologique 

  //read
  getBilanRadio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/get`);
  }

  //creat
  postBilanRadio(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bilan-radio/create/`, data);
  }

  // update
  updateBilanRadio(id: number, data: any): Observable<any> {
    let image = data.image_url;
    return this.http.put<any>(`${this.apiUrl}/bilan-radio/update/${id}/`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // delete
  deleteBilanRadio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/bilan-radio/${id}/delete`);
  }

  getbilanradioconsultation(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/bilan-consultation/${id}`);
  }

  getbilanparid(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/bilan-id/${id}`);
  }

  //image
  get_image(id : number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/image/${id}`);
  }

  ////////////////////////////////////////////////////////////////////////////
  //bilan biologique :

  //read
  getBilanBio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bilan-bio/get`);
  }

  //creat
  postBilanBio(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bilan-bio/create/`, data);
  }

  getbilanbioconsultation(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-bio/bilan-consultation/${id}`);
  }

   // delete
   deleteBilanBio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/bilan-bio/delete/${id}/`);
  }

  //bilan d'un patient donné
  getBilanPatient(id : number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bilan-bio/bilan-patient/${id}/`);
  }

  ////////////////////////////////////////////////////////////////////////////
  //analyse biologique :

  //read
  getAnalyseBio(id : number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bilan-bio/analysebio/${id}`);
  }

  //create
  postAnalyseBio(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bilan-bio/analysebio/create/`, data);
  }

  //update :
  putAnalyseBio(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/bilan-bio/analysebio/update/${id}/`, data);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // graphique tendances :
  postImageGraphique(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bilan-bio/save-graph/`, data);
  }
}
