import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar-roteiro',
  templateUrl: './criar-roteiro.page.html',
  styleUrls: ['./criar-roteiro.page.scss'],
})
export class CriarRoteiroPage implements OnInit {

  nomeRoteiro: string = '';
  descricaoRoteiro: string = '';
  tipoRoteiro: string = '';
  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Lógica de inicialização adicional, se necessário
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.selectedFiles = Array.from(inputElement.files);
    }
  }

  criarRoteiro() {
    const formData = new FormData();
    formData.append('nome', this.nomeRoteiro);
    formData.append('descricao', this.descricaoRoteiro);
    formData.append('tipo', this.tipoRoteiro);

    this.http.post('http://localhost:5500/roteiro/createRoteiro', formData).subscribe(
      (response) => {
        console.log('Roteiro criado com sucesso', response);
        // Lógica adicional após a criação bem-sucedida do roteiro
      },
      (error) => {
        console.error('Erro ao criar roteiro', error);
        // Lógica adicional em caso de erro na criação do roteiro
      }
    );
  }
}
