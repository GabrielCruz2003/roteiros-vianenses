import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private http: HttpClient) {}

  weatherData: any = {};

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
}


