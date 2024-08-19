import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatService {

   baseUrl = `${environment.api}candidat`;

  constructor(private http: HttpClient) { }

  getAllCandidat(): Observable<any>{
    console.log(this.baseUrl);
    
    return this.http.get(`${this.baseUrl}`); 
  }

  getCandidatById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  delete(data: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${data}`);
  }


  update(data : any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/update`, data);
  }



}
