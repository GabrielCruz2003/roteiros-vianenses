import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRoteiroPageRoutingModule } from './edit-roteiro-routing.module';

import { EditRoteiroPage } from './edit-roteiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRoteiroPageRoutingModule
  ],
  declarations: [EditRoteiroPage]
})
export class EditRoteiroPageModule {}
