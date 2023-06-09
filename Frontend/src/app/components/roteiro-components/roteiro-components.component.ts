
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getImageUrl } from './roteiro-utils';
import { Router, NavigationExtras } from '@angular/router';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { type } from 'os';



@Component({
  selector: 'app-roteiro-components',
  templateUrl: './roteiro-components.component.html',
  styleUrls: ['./roteiro-components.component.scss'],
})
export class RoteiroComponentsComponent implements OnInit {
  roteiros: any = [];
  roteiroTypes: any = [];
  comentarios: any[] = [];
  comentarioForm!: FormGroup;



  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getRoteiros();
    this.getRoteiroTypes();
    this.initializeForm();
  }

  getRoteiros(): void {
    this.http
      .get<any>('http://localhost:5500/roteiro/getRoteiro')
      .subscribe(
        (response) => {
          this.roteiros = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getRoteiroTypes(): void {
    this.http
      .get<any>('http://localhost:5500/roteiro/getRoteiroType')
      .subscribe(
        (response) => {
          this.roteiroTypes = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getImageUrl(nome: string): string {
    return `http://localhost:5500/uploads/${nome}`;
  }

  getRoteiroTypeName(roteiroTypeId: number): string {
    const roteiroType = this.roteiroTypes.find((type: any) => type.id === roteiroTypeId);
    return roteiroType ? roteiroType.type : '';
  }


  verMais(id: number, nome: string, imagem: string, descricao: number, tipo: string, data: string) {
    const tipoRoteiro = this.getRoteiroTypeName(parseInt(tipo, 10));
    const imageUrl = this.getImageUrl(imagem);
    const navigationExtras: NavigationExtras = {
      state: {
        roteiro: {
          id: id,
          nome: nome,
          imagem: imageUrl,
          descricao: descricao,
          tipo: tipoRoteiro,
          data: data
        }
      }
    };
    this.router.navigate(['/detalhes'], navigationExtras);
  }



  getComentariosByRoteiro(roteiroId: number): void {
    this.http
      .get<any>(`http://localhost:5500/comentario/comentarios/${roteiroId}`)
      .subscribe(
        (response) => {
          this.comentarios = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }


  criarComentario(roteiroId: number, comentario: string, userId: number): void {
    this.http
      .post<any>(`http://localhost:5500/comentario/createComentario`, {
        roteiroId: roteiroId,
        comentario: comentario,
        userId: userId,
      })
      .subscribe(
        (response) => {
          this.getComentariosByRoteiro(roteiroId);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  initializeForm(): void {
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }


}
