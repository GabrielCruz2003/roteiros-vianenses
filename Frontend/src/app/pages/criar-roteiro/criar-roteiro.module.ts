import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarRoteiroPageRoutingModule } from './criar-roteiro-routing.module';

import { CriarRoteiroPage } from './criar-roteiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarRoteiroPageRoutingModule
  ],
  declarations: [CriarRoteiroPage]
})
export class CriarRoteiroPageModule {}
