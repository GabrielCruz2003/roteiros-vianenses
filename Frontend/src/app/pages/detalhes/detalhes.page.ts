import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/tokenService';




@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  roteiro: any = {
    userLiked: false
  };
  comentarios: any[] = [];
  comentarioForm!: FormGroup;
  roteiroTypes: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private tokenService: TokenService

  ) {
    this.initializeForm(); // Inicialize o formulário no construtor
  }


  ngOnInit() {
    this.roteiro = history.state.roteiro;
    this.roteiro.data = format(new Date(this.roteiro.data), 'dd/MM/yyyy');
    console.log(this.roteiro);

    const user_id = this.tokenService.getUserId();
    if (user_id) {
      this.http
        .get<boolean>(`http://localhost:5500/like/checkLike/${user_id}/${this.roteiro.id}`)
        .subscribe(
          (response) => {
            this.roteiro.userLiked = response;
          },
          (error) => {
            console.error(error);
          }
        );
    }

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
    const user_id = this.tokenService.getUserId();

    if (user_id) {
      this.http
        .post<any>(`http://localhost:5500/comentario/createComentario`, {
          user_id: user_id,
          roteiro_id: roteiroId,
          comentario: comentario,
        })
        .subscribe(
          (response) => {
            this.getComentarios(roteiroId);
            this.comentarioForm.reset();
            this.exibirToastSucesso('Comentário adicionado com sucesso!');

          },
          (error) => {
            console.error(error);
            this.exibirToastErro('Erro ao adicionar comentário!');
          }
        );
    } else {
      console.error('ID do usuário não disponível.');
    }


  }


async exibirToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, // duração em milissegundos
      position: 'top', // posição do toast
      color: 'success' // cor do toast (opcional)
    });
    toast.present();
  }



  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, // duração em milissegundos
      position: 'top', // posição do toast
      color: 'danger' // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastSucessoLike(mensagem: string) {
    const toast = await this.toastController.create({
      message: "Like adicionado com sucesso!",
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'success' // cor do toast (opcional)
    });
    toast.present();
  }

  adicionarLike() {
    const user_id = this.tokenService.getUserId();
    const roteiro_id = this.roteiro.id;

    if (user_id) {
      this.http
        .post<any>(`http://localhost:5500/like/addLike`, {
          user_id: user_id,
          roteiro_id: roteiro_id,
        })
        .subscribe(
          (response) => {
            this.exibirToastSucessoLike('Like adicionado com sucesso!');
            this.roteiro.userLiked = response.userLiked;
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      console.error('ID do usuário não disponível.');
    }
  }



}


