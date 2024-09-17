import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = `${environment.api}note`;

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<any>{
    console.log(this.baseUrl);
    
    return this.http.get(`${this.baseUrl}`); 
  }

  getNoteById(id: number): Observable<any> {
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
  }}
