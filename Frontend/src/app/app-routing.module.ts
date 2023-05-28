import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';



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
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
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
    path: 'sidemenu',
    loadChildren: () => import('./components/side-menu/side-menu.module').then( m => m.SideMenuModule)
  },  {
    path: 'detalhes',
    loadChildren: () => import('./pages/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
