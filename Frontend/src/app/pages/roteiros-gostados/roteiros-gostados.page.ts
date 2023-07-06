import { TokenService } from './../../services/tokenService';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Like {
  id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  roteiro_id: number;
  roteiro: {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    imagem: string;
    createdAt: string;
    updatedAt: string;
    roteiro_type_id: number;
  };
}

@Component({
  selector: 'app-roteiros-gostados',
  templateUrl: './roteiros-gostados.page.html',
  styleUrls: ['./roteiros-gostados.page.scss'],
})
export class RoteirosGostadosPage implements OnInit {
  likes: Like[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getLikesByUser();
  }

  getLikesByUser(): void {
    const userId = this.tokenService.getUserId();
    if (userId) {
      this.http
        .get<Like[]>('http://localhost:5500/like/getLikesByUser/' + userId)
        .subscribe(
          (response) => {
            this.likes = response;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }


}
