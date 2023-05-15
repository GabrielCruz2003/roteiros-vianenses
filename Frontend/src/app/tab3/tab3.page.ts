import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login';
    }
  }

}
