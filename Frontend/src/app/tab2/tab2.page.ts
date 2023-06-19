import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoteiroService } from '../services/roteiro-service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private http: HttpClient, private route: Router,
    @Inject(RoteiroService) private roteiroService: RoteiroService
    ) {}

  weatherData: any = {};
  ultimosRoteiros: any = [];
  roteiroTypes: any = [];

  ngOnInit() {
    this.carregarUltimosRoteiros();
  }

  getWeatherData(): Observable<any> {
    const globalIdLocal = '1010500'; // Viana do Castelo
    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${globalIdLocal}.json`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => this.weatherData = data)
      );
  }

  ionViewWillEnter() {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login';
    } else {
      this.getWeatherData().subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.log('Erro ao obter dados do clima:', error);
        }
      );
    }
  }

  carregarUltimosRoteiros() {
    this.roteiroService.getUltimosRoteiros(4)
      .subscribe((roteiros) => {
        this.ultimosRoteiros = roteiros;
      });
  }

  getRoteiroTypes(): void {
    this.http
      .get<any>('http://localhost:5500/roteiro/getRoteiroType')
      .subscribe(
        (response) => {
          this.roteiroTypes = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getRoteiroTypeName(roteiroTypeId: number): string {
    const roteiroType = this.roteiroTypes.find((type: any) => type.id === roteiroTypeId);
    return roteiroType ? roteiroType.type : '';
  }

  getImageUrl(nome: string): string {
    return `http://localhost:5500/uploads/${nome}`;
  }

  irTempo() {
    this.route.navigate(['/tempo']);
  }
}



