import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoteirosInscritosPageRoutingModule } from './roteiros-inscritos-routing.module';

import { RoteirosInscritosPage } from './roteiros-inscritos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoteirosInscritosPageRoutingModule
  ],
  declarations: [RoteirosInscritosPage]
})
export class RoteirosInscritosPageModule {}
