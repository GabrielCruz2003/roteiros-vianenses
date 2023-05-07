import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  
  //verifica se o usuário está logado
  ionViewWillEnter(){
    if(localStorage.getItem('token') == null){
      window.location.href = '/login';
    }
  }

}
