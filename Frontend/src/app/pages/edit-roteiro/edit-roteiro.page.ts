import { format } from 'date-fns';
import { RoteiroService } from './../../services/roteiro-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/tokenService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-roteiro',
  templateUrl: './edit-roteiro.page.html',
  styleUrls: ['./edit-roteiro.page.scss'],
})
export class EditRoteiroPage implements OnInit {
  roteiro: any;
  tiposRoteiro: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private roteiroService: RoteiroService,
    private http: HttpClient,
    private toastController: ToastController,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoteiroDetails();
    this.getRoteiroTypes();
  }

  async toastSucesso() {
    const toast = await this.toastController.create({
      message: 'Roteiro atualizado com sucesso!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async toastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  getRoteiroDetails() {
    const roteiroId = this.route.snapshot.params['id'];
    this.roteiroService.getRoteiroById(roteiroId).subscribe(
      (response) => {
        this.roteiro = response;
        this.tiposRoteiro = [response.roteiro_type];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.roteiro.imagem = file;
  }

  updateRoteiro() {
    const formData = new FormData();
    formData.append('nome', this.roteiro.nome);
    formData.append('descricao', this.roteiro.descricao);
    formData.append('data', this.roteiro.data);

    if (this.roteiro.roteiro_type && this.roteiro.roteiro_type.id) {
      formData.append('roteiro_type_id', this.roteiro.roteiro_type.id.toString());
    }

    const userId = this.tokenService.getUserId();
    if (userId) {
      formData.append('user_id', userId.toString());
    } else {
      console.error('User ID is null');
      return;
    }

    formData.append('imagem', this.roteiro.imagem);

    this.roteiroService.updateRoteiro(this.roteiro.id, formData).subscribe(
      () => {
        this.toastSucesso();
        this.router.navigate(['/tabs/tab1']);
      },
      (error) => {
        this.toastErro(error.error.message);
      }
    );
  }




  getRoteiroTypes() {
    this.roteiroService.getRoteiroTypes().subscribe(
      (response) => {
        this.tiposRoteiro = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  voltar() {
    this.router.navigate(['/tabs/tab1']);
  }

}
