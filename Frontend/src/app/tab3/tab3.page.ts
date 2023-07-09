import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/tokenService';

interface User {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userPhoto: string = '';
  userName: string = '';






  constructor(private tokenService: TokenService, private http: HttpClient) {}

  ionViewWillEnter() {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login';
    } else {
      const userId = this.tokenService.getUserId();
      if (userId) {
        this.getUserDetails(userId).subscribe(
          (response: User) => {
            this.userPhoto = response.image;
            this.userName = response.name;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getUserDetails(userId: number) {
    const url = `http://localhost:5500/users/getUserById/${userId}`;
    return this.http.get<User>(url);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  redirectToRoteirosGostados() {
    const userId = this.tokenService.getUserId();
    if (userId) {
      window.location.href = `/roteiros-gostados/${userId}`;
    }
  }

  redirectToRoteirosInscritos() {
    const userId = this.tokenService.getUserId();
    if (userId) {
      window.location.href = `/roteiros-inscritos/${userId}`;
    }
  }

  irEditarPerfil() {
    const userId = this.tokenService.getUserId();
    if (userId) {
      window.location.href = `/edit-user/${userId}`;
    }
  }
}
