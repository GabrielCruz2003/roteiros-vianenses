import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { windowWhen } from 'rxjs';
import { ToastController } from '@ionic/angular';

interface TipoRoteiro {
  id: number;
  type: string;
}

interface roteiro {
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

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.getTiposRoteiro();
  }



  getTiposRoteiro() {
    this.http.get<TipoRoteiro[]>('http://localhost:5500/roteiro/getRoteiroType').subscribe(
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

    if (!this.nomeRoteiro || !this.descricaoRoteiro || !this.dataRoteiro || !this.tipoRoteiro) {
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
    formData.append('imagem', this.imagem);

    this.http.post<roteiro>('http://localhost:5500/roteiro/createRoteiro', formData).subscribe(
    (response) => {
      console.log('Roteiro criado com sucesso:', response);
      this.toastDeSucesso('Roteiro criado com sucesso!');
      window.location.href = '/tabs/tab1';

    },
    (error) => {
      console.log('Erro ao criar o roteiro:', error);
      console.log('Resposta do servidor:', error.error);
      // Lógica para lidar com erros ao criar o roteiro
    }
  );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.imagem = files.item(0);
  }



   //toast de sucesso
 async toastDeSucesso(mensagem: string) {
  const toast = await this.toastController.create({
    message: mensagem,
    duration: 4000,
    color: 'success',
    position: 'bottom',
  });

}



}


