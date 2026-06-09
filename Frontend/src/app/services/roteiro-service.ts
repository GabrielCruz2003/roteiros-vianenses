import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class RoteiroService {

  constructor(private http: HttpClient) {}


  getUltimosRoteiros(n: number): Observable<any[]> {
    const url = `${environment.apiUrl}/roteiro/getRoteiro?limit=` + 4;
    return this.http.get<any[]>(url);
  }

  getRoteiroById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/roteiro/getRoteiroById/${id}`;
    return this.http.get<any>(url);
  }

  updateRoteiro(id: number, roteiroAtualizado: any): Observable<any> {
    const url = `${environment.apiUrl}/roteiro/updateRoteiro/${id}`;
    return this.http.put<any>(url, roteiroAtualizado);
  }

  getRoteiroTypes(): Observable<any[]> {
    const url = `${environment.apiUrl}/roteiro/getRoteiroType`;
    return this.http.get<any[]>(url);
  }

  


}
