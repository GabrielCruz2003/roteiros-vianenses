import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/tokenService';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface TipoRoteiro {
  id: number;
  type: string;
}

interface Roteiro {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  roteiro_type_id: string;
  imagem: string;
  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'app-criar-roteiro',
  templateUrl: './criar-roteiro.page.html',
  styleUrls: ['./criar-roteiro.page.scss'],
})
export class CriarRoteiroPage implements OnInit {
  nomeRoteiro: string = '';
  descricaoRoteiro: string = '';
  tipoRoteiro: number | null = null;
  dataRoteiro: string = '';
  imagem: File | null = null;

  tiposRoteiro: TipoRoteiro[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.getTiposRoteiro();
  }

  getTiposRoteiro() {
    this.http
      .get<TipoRoteiro[]>('http://localhost:5500/roteiro/getRoteiroType')
      .subscribe(
        (response) => {
          this.tiposRoteiro = response;
        },
        (error) => {
          console.log('Erro ao criar o roteiro:', error);
          console.log('Resposta do servidor:', error.error);
        }
      );
  }

  criarRoteiro() {
    if (
      !this.nomeRoteiro ||
      !this.descricaoRoteiro ||
      !this.dataRoteiro ||
      !this.tipoRoteiro
    ) {
      console.log('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.imagem || !this.tipoRoteiro) {
      console.log('Selecione uma imagem e um tipo de roteiro.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.nomeRoteiro);
    formData.append('descricao', this.descricaoRoteiro);
    formData.append('data', this.dataRoteiro);
    formData.append('roteiro_type_id', String(this.tipoRoteiro));
    formData.append('user_id', String(this.tokenService.getUserId())); // Obtém o user_id do TokenService
    formData.append('imagem', this.imagem);

    this.http
      .post<Roteiro>('http://localhost:5500/roteiro/createRoteiro', formData)
      .subscribe(
        (response) => {
          console.log('Roteiro criado com sucesso:', response);
          this.router.navigate(['/tabs/tab1']); // Redireciona para a rota '/tabs/tab1'
          this.presentToastSucesso('Roteiro criado com sucesso!');
        },
        (error) => {
          console.log('Erro ao criar o roteiro:', error);
          console.log('Resposta do servidor:', error.error);
          this.presentToastErro(error.error.message);

        }
      );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.imagem = files.item(0);
  }

  //toast que mostra o erro
  async presentToastErro(message : string) {
    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  //toast que mostra o sucesso
  async presentToastSucesso(message : string) {
    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      duration: 2000
    });
    toast.present();
  }


}
