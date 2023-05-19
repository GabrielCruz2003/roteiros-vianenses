import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarRoteiroPage } from './criar-roteiro.page';

const routes: Routes = [
  {
    path: '',
    component: CriarRoteiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarRoteiroPageRoutingModule {}
