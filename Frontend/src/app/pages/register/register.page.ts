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
  image: File | null = null; // Alteração: Definir o tipo como File ou null

  constructor(private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
  }

  async exibirToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Usuário criado com sucesso!",
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Erro ao criar usuário!",
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  createUser() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.http.post('http://localhost:5500/users/createUser', formData)
      .subscribe(
        response => {
          console.log(response);
          window.location.href = '/login';
          this.exibirToastSucesso('Usuário criado com sucesso!');
        },
        error => {
          console.error(error);
          this.exibirToastErro(error.error.message);
        }
      );
  }
}
