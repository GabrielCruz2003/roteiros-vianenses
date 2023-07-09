import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    }
    return null;
  }

  getUserType(): Promise<string | null> {
    const userId = this.getUserId();
    if (userId) {
      return this.http
        .get<any>('http://localhost:5500/users/getUsers')
        .toPromise()
        .then((users: any[]) => {
          const user = users.find(u => u.id === userId);
          return user ? user.user_type.type : null;
        })
        .catch(error => {
          console.error('Erro ao obter o tipo de usuário:', error);
          return null;
        });
    } else {
      return Promise.resolve(null);
    }
  }

  updateUser() {
    const user_id = this.getUserId();
    return this.http.get(`http://localhost:5500/users/updateUser/` + user_id);
  }
  
}
