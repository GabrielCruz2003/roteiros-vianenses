import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  isToastOpen = false;

  constructor(private authService: AuthService, private navCtrl: NavController, private toastController: ToastController ) { }


  ngOnInit() {
  }




  doLogin(){
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log(response); // Exibe a resposta do servidor no console
        // redericionar para a pagina de home
        this.navCtrl.navigateRoot('/tabs/tab2');
        this.exibirToastSucesso("Login efetuado com sucesso!");

      },
      error => {
        console.log(error); // Exibe o erro no console
        // Coloque aqui o código que deve ser executado em caso de erro.
        this.exibirToastErro("Erro ao efetuar login!");
      }
    );
  }


  async exibirToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Login efetuado com sucesso!",
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'success' // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Erro ao efetuar login!",
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'danger' // cor do toast (opcional)
    });
    toast.present();
  }


}
