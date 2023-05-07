import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) { }


  ngOnInit() {
  }


  doLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log(response); // Exibe a resposta do servidor no console
        // redericionar para a pagina de home
        this.navCtrl.navigateRoot('/tabs/tab2');
      },
      error => {
        console.log(error); // Exibe o erro no console
        // Coloque aqui o código que deve ser executado em caso de erro.
      }
    );
  }



}

