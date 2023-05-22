import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private toastController: ToastController) { }

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
            this.exibirToastSucesso('Usuário criado com sucesso!');
        },
        error => {
          console.error(error);
          // Tratar o erro, exibir uma mensagem de erro
          this.exibirToastErro('Erro ao criar usuário!');
        }
      );
  }

  async exibirToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Usuário criado com sucesso!",
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'success' // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Erro ao criar usuário!",
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'danger' // cor do toast (opcional)
    });
    toast.present();
  }

}
