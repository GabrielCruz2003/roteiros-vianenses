import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.page.html',
  styleUrls: ['./tempo.page.scss'],
})
export class TempoPage implements OnInit {

  weatherData: any = {};
  iconPath: string = 'assets/imagens/tempo-icons/';

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.getWeatherData().subscribe();
  }

  getWeatherData(): Observable<any> {
    const globalIdLocal = '1010500'; // Viana do Castelo
    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${globalIdLocal}.json`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => this.weatherData = data)
      );
  }

  voltar() {
    this.route.navigate(['/tabs/tab2']);
  }
}
