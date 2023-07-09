import { TokenService } from './../../services/tokenService';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage {
  user: any;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });

    this.user = {};

  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const id = this.tokenService.getUserId();
    this.http.get(`http://localhost:5500/users/getUserById/` + id).pipe(
      catchError((error) => {
        console.error(error);
        return throwError("Erro ao obter os dados do usuário.");
      })
    ).subscribe(
      (response) => {
        if (response) {
          this.user = response;
          if (this.user.name) {
            this.userForm.patchValue({
              name: this.user.name
            });
          }
          if (this.user.email) {
            this.userForm.patchValue({
              email: this.user.email
            });
          }
          if (this.user.password) {
            this.userForm.patchValue({
              password: this.user.password
            });
          }
        }
      }

    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.user.image = file;
  }


  submitForm() {
    const user_id = this.user.id; // Altere esta linha para obter o ID do usuário diretamente do objeto `user`

    const formData = new FormData();
    formData.append('name', this.userForm.value.name);
    formData.append('email', this.userForm.value.email);
    formData.append('password', this.userForm.value.password);
    if (user_id!== null) {
      formData.append('user_id', user_id.toString());
    }
    if (this.user.image) {
      formData.append('image', this.user.image);
    }

    this.http.put(`http://localhost:5500/users/updateUser/${user_id}`, formData).subscribe(
      (response) => {
        this.router.navigate(['/tabs/tab3']);
        this.presentToastSucess('Usuário atualizado com sucesso!');
      },
      (error) => {
        console.error(error);
        console.log(formData);
        this.presentToastError(error.error.message);
      }
    );
  }

  consoleLogUser() {
    console.log(this.user);
  }

  async presentToastSucess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

}
