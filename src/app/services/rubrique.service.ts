import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  private baseUrl = 'http://localhost:8086/api/sjm/rubrique'
  constructor(private http: HttpClient) { }



  getAllRubrique(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);  }

    getRubriqueById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
    createRubrique(rubrique: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, rubrique);
    }
  
    deleteRubrique(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }}
