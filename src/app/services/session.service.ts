import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = `${environment.api}session`;
  constructor(private http: HttpClient) { }

  getAllSession(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);  }

    getSessionById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    update(data :any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/update`, data);
    }
  
    create(data: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/save`, data);
    }
  
    delete(data: any): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${data}`);
    }}
