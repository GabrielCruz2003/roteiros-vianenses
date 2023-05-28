import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  roteiro: any = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.roteiro = history.state.roteiro;
    console.log(this.roteiro);
  }

  voltar() {
    this.router.navigate(['/tabs/tab1']);
  }

}

