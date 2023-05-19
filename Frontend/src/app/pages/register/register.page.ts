import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  createUser() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5500/users/create', userData)
      .subscribe(
        response => {
          console.log(response);
          // Tratar a resposta do servidor, redirecionar ou exibir uma mensagem de sucesso
            window.location.href = '/login';
        },
        error => {
          console.error(error);
          // Tratar o erro, exibir uma mensagem de erro
          alert('Erro ao criar usuário');
        }
      );
  }
}
