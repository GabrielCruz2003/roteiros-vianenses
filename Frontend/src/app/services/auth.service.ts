import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const data = { email, password };
    return this.http.post<LoginResponse>('http://localhost:5500/users/login', data)
      .pipe(
        map(response => {
          const token = response.token;
          localStorage.setItem('token', token);
          return response; // ou retorne apenas o token se necessário
        }),
        catchError(error => {
          console.log('Erro durante a solicitação de login:', error);
          throw error;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }



  register(name:string ,email: string, password: string): Observable<any> {
    const data = { name, email, password };
    return this.http.post('/api/register', data);
  }

  logout(): Observable<any> {
    return this.http.get('/api/logout');
  }

  isAuthenticated(): Observable<any> {
    return this.http.get('/api/is-authenticated');
  }
}
