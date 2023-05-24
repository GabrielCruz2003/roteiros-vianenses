import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface RoteiroType {
  id: number;
  type: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  roteiros: any = [];
  roteiroTypes: RoteiroType[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRoteiros();
    this.getRoteiroTypes();
  }

  ionViewWillEnter() {
    if (localStorage.getItem('token') == null) {
      window.location.href = '/login';
    }
  }

  getRoteiros(): void {
    this.http
      .get<any>('http://localhost:5500/roteiro/getRoteiro')
      .subscribe(
        (response) => {
          this.roteiros = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getRoteiroTypes(): void {
    this.http
      .get<RoteiroType[]>('http://localhost:5500/roteiro/getRoteiroType')
      .subscribe(
        (response) => {
          this.roteiroTypes = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getRoteiroTypeName(id: number): string {
    const roteiroType = this.roteiroTypes.find((type: RoteiroType) => type.id === id);
    return roteiroType ? roteiroType.type : '';
  }


}
