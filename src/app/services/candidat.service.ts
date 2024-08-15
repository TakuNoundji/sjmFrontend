import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CandidatService {

  private baseUrl = 'http://localhost:8086/api/sjm/candidat'

  constructor(private http: HttpClient) { }

  getAllCandidat(): Observable<any>{
    return this.http.get(`${this.baseUrl}`); 
  }

  getCandidatById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCandidat(candidat: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, candidat);
  }

  deleteCandidat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }



}
