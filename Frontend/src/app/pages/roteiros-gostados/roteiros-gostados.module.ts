import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoteirosGostadosPageRoutingModule } from './roteiros-gostados-routing.module';

import { RoteirosGostadosPage } from './roteiros-gostados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoteirosGostadosPageRoutingModule
  ],
  declarations: [RoteirosGostadosPage]
})
export class RoteirosGostadosPageModule {}
