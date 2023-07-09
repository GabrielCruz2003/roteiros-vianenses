import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/tokenService';
import { HttpHeaders } from '@angular/common/http';


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
  isAdmin = false;


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
        .get<boolean>(`http://localhost:5500/like/getLikes/${user_id}/${this.roteiro.id}`)
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
    this.checkAdminStatus();
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
      position: 'bottom', // posição do toast
      color: 'success', // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'danger', // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastSucessoLike(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, // duração em milissegundos
      position: 'bottom', // posição do toast
      color: 'success', // cor do toast (opcional)
    });
    toast.present();
  }

  async exibirToastSucessoInscricao(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  async exibirToastErroInscricao(mensagem: string) {
      const toast = await this.toastController.create({
        message: mensagem,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
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
            if (error.error && error.error.error === 'Usuário já deu like') {
              this.exibirToastErro('Usuário já deu like!');
            } else {
              console.error(error);
            }
          }
        );
    } else {
      // Lógica para lidar com a ausência de user_id
    }
  }

  inscrever(): void {
    const user_id = this.tokenService.getUserId();
    if (user_id) {
      const roteiro_id = this.roteiro.id;
      this.http
        .post<any>(`http://localhost:5500/inscricoes/createInscricao`, {
          roteiro_id: roteiro_id,
          user_id: user_id,
        })
        .subscribe(
          (response) => {
            this.exibirToastSucessoInscricao('Inscrição realizada com sucesso!');
          },
          (error) => {
            console.error(error);
            //mostrar o erro do backend
            this.exibirToastErroInscricao(error.error.mensagem);
          }
        );
    }
  }

  async checkAdminStatus() {
    const userType = await this.tokenService.getUserType();
    this.isAdmin = userType === 'admin';
    console.log(this.isAdmin);
  }

  eliminarRoteiro() {
    const user_id = this.tokenService.getUserId();
    const roteiro_id = this.roteiro.id;


    if (user_id) {
      const requestOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }),
        body: {
          user_id: user_id,
          roteiro_id: roteiro_id
        }
      };

      this.http.delete('http://localhost:5500/roteiro/deleteRoteiro', requestOptions)
        .subscribe(
          () => {
            this.router.navigate(['/tabs/tab1']);
            this.exibirToastSucesso('Roteiro eliminado com sucesso!');
          },
          (error) => {
            console.error(error);
            this.exibirToastErro(error.error.mensagem)
            // Lidar com erros de exclusão
          }
        );
    } else {
      // Lógica para lidar com a ausência de user_id
    }
  }

  eliminarComentario(){
    const user_id = this.tokenService.getUserId();
    const roteiro_id = this.roteiro.id;
    const comentario_id = this.comentarios[0].id; // Acessa o id do primeiro comentário da lista

    if (user_id) {
      const requestOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.tokenService.getToken()}`
        }),
        body: {
          user_id: user_id,
          roteiro_id: roteiro_id,
          comentario_id: comentario_id
        }
      };

      this.http.delete('http://localhost:5500/comentario/deleteComentario', requestOptions)
        .subscribe(
          () => {
            this.router.navigate(['/tabs/tab1']);
            this.exibirToastSucesso('Comentário eliminado com sucesso!');
          },
          (error) => {
            console.error(error);
            this.exibirToastErro(error.error.mensagem)
            // Lidar com erros de exclusão
          }
        );
    } else {
      // Lógica para lidar com a ausência de user_id
    }


  }

  redirectToEditRoteiro() {
    const id = this.roteiro.id;

    this.router.navigate([`/edit-roteiro/${id}`]);

  }

}

