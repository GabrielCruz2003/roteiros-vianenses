import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RoteiroComponentsModule } from './components/roteiro-components/roteiro-components.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: "ios" }),
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ToolbarModule,
    RoteiroComponentsModule,


  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    NavController

  ],
  bootstrap: [AppComponent, RoteiroComponentsModule],
})

export class AppModule {}
