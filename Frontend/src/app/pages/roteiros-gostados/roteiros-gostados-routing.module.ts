import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoteirosGostadosPage } from './roteiros-gostados.page';

const routes: Routes = [
  {
    path: '',
    component: RoteirosGostadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoteirosGostadosPageRoutingModule {}
