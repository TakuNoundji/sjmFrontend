import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private baseUrl = `${environment.api}seance`;
  constructor(private http: HttpClient) { }

  getAlSeance(): Observable<any>{

    console.log(this.baseUrl);
    
    return this.http.get(`${this.baseUrl}`);  }

    getSeanceById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    update(data: any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}update`, data);
    }


  
    create(data: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}save`, data);
    }
  
    delete(data: any): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}${data}`);
    }
  }
