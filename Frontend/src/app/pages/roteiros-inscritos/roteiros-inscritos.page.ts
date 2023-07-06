import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/tokenService';

interface Inscricao {
  id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  roteiro_id: number;
  user: {
    id: number;
    name: string;
    email: string;
    // Outras propriedades do usuário
  };
  roteiro: {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    imagem: string;
    // Outras propriedades do roteiro
  };
}

@Component({
  selector: 'app-roteiros-inscritos',
  templateUrl: './roteiros-inscritos.page.html',
  styleUrls: ['./roteiros-inscritos.page.scss'],
})
export class RoteirosInscritosPage implements OnInit {
  inscricoes: Inscricao[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getInscricaoByUser();
  }

  getInscricaoByUser(): void {
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.http
        .get<Inscricao[]>('http://localhost:5500/inscricoes/getInscricaoByUser/' + userId)
        .subscribe(
          (response) => {
            this.inscricoes = response;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
}
