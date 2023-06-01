import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { verify } from 'jsonwebtoken';
import {Jwt} from 'jsonwebtoken';



@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  roteiro: any = [];
  comentarios: any[] = [];
  comentarioForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,

  ) {
    this.initializeForm(); // Inicialize o formulário no construtor
  }

  ngOnInit() {
    this.roteiro = history.state.roteiro;
    this.roteiro.data = format(new Date(this.roteiro.data), 'dd/MM/yyyy');
    console.log(this.roteiro);

    // Obtém os comentários do roteiro
    this.getComentarios(this.roteiro.id);
  }

  voltar() {
    this.router.navigate(['/tabs/tab1']);
  }

  getComentarios(roteiroId: number) {
    this.http
      .get<any[]>(`http://localhost:5500/comentario/comentarios/${roteiroId}`)
      .subscribe(
        (response) => {
          this.comentarios = response;
          console.log(this.comentarios);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  initializeForm() {
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }



  criarComentario() {
    const comentario = this.comentarioForm.get('comentario')?.value;
    const roteiroId = this.roteiro.id;
 


    const jwt = require('jsonwebtoken');

  // Assuming you have the token and secret key stored in variables
  const token = localStorage.getItem('token') ;
  const secretKey = '408312uasuifsn8913418432nfdus383~321';

  try {
    const decoded = jwt.verify(token, secretKey);
    // The token is valid and has been successfully decoded
    console.log(decoded);
  } catch (error) {
    // An error occurred while verifying the token
    console.error('Token verification failed:', error);
  }


    this.http
      .post<any>(`http://localhost:5500/comentario/createComentario`, {
        roteiroId: roteiroId,
        comentario: comentario,

      })
      .subscribe(
        (response) => {
          this.getComentarios(roteiroId);
          this.comentarioForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
  }


}


