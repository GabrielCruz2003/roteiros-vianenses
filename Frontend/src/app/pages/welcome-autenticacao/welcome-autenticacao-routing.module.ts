import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeAutenticacaoPage } from './welcome-autenticacao.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeAutenticacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeAutenticacaoPageRoutingModule {}
