import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; //Base abckend url

  constructor(private http: HttpClient) { }

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

  getbilanconsultation(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/bilan-consultation/${id}`);
  }

  getbilanparid(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bilan-radio/bilan-id/${id}`);
  }

}
