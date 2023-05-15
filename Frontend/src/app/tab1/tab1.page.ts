import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login';
    }
  }

}
