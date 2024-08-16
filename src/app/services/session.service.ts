import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = 'http://localhost:8086/api/sjm/session'
  constructor(private http: HttpClient) { }

  getAllSession(): Observable<any>{
    return this.http.get(`${this.baseUrl}`);  }

    getSessionById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }
  
    createSession(session: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, session);
    }
  
    deleteSession(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }}
