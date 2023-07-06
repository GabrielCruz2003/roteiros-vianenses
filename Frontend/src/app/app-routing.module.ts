import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';




const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'criar-roteiro',
    loadChildren: () => import('./pages/criar-roteiro/criar-roteiro.module').then( m => m.CriarRoteiroPageModule)
  },
  {
    path: 'tempo',
    loadChildren: () => import('./pages/tempo/tempo.module').then( m => m.TempoPageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./pages/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'roteiros-gostados/:user_id',
    loadChildren: () => import('./pages/roteiros-gostados/roteiros-gostados.module').then( m => m.RoteirosGostadosPageModule)
  },
  {
    path: 'roteiros-inscritos/:user_id',
    loadChildren: () => import('./pages/roteiros-inscritos/roteiros-inscritos.module').then( m => m.RoteirosInscritosPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
