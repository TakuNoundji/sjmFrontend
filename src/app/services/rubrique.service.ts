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

    update(data: any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/update`, data);
    }
  
    create(data: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/save`, data);
    }
  
    delete(data: any): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}${data}`);
    }}
