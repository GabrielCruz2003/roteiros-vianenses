import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRoteiroPage } from './edit-roteiro.page';

const routes: Routes = [
  {
    path: '',
    component: EditRoteiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoteiroPageRoutingModule {}
