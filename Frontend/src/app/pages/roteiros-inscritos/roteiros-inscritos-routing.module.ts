import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoteirosInscritosPage } from './roteiros-inscritos.page';

const routes: Routes = [
  {
    path: '',
    component: RoteirosInscritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoteirosInscritosPageRoutingModule {}
