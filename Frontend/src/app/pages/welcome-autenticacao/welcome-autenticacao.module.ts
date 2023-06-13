import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeAutenticacaoPageRoutingModule } from './welcome-autenticacao-routing.module';

import { WelcomeAutenticacaoPage } from './welcome-autenticacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeAutenticacaoPageRoutingModule
  ],
  declarations: [WelcomeAutenticacaoPage]
})
export class WelcomeAutenticacaoPageModule {}
