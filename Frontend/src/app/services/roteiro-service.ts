import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class RoteiroService {

  constructor(private http: HttpClient) {}


  getUltimosRoteiros(n: number): Observable<any[]> {
    const url = 'http://localhost:5500/roteiro/getRoteiro?limit=' + 4;
    return this.http.get<any[]>(url);
  }

  getRoteiroById(id: number): Observable<any> {
    const url = `http://localhost:5500/roteiro/getRoteiroById/${id}`;
    return this.http.get<any>(url);
  }

  updateRoteiro(id: number, roteiroAtualizado: any): Observable<any> {
    const url = `http://localhost:5500/roteiro/updateRoteiro/${id}`;
    return this.http.put<any>(url, roteiroAtualizado);
  }

  getRoteiroTypes(): Observable<any[]> {
    const url = 'http://localhost:5500/roteiro/getRoteiroType';
    return this.http.get<any[]>(url);
  }


}
