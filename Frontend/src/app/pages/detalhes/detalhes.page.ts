import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  roteiro: any = [];
  comentarios: any[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

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
    this.http.get<any[]>(`http://localhost:5500/comentario/comentarios/${roteiroId}`).subscribe(
      (response) => {
        this.comentarios = response;
        console.log(this.comentarios);
      },
      (error) => {
        console.error(error);
      }
    );
  }





}

