import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private baseUrl = 'http://localhost:8086/api/sjm/seance'
  constructor(private http: HttpClient) { }

  getAllSeance(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);  }

    getSeanceById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
    createSeance(seance: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, seance);
    }
  
    deleteSeance(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
  }
