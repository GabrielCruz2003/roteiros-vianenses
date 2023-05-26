import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getImageUrl } from './roteiro-utils';

@Component({
  selector: 'app-roteiro-components',
  templateUrl: './roteiro-components.component.html',
  styleUrls: ['./roteiro-components.component.scss'],
})
export class RoteiroComponentsComponent implements OnInit {
  roteiros: any = [];
  roteiroTypes: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRoteiros();
    this.getRoteiroTypes();
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

  getImageUrl(nome: string): string {
    return `http://localhost:5500/uploads/${nome}`;
  }

  getRoteiroTypeName(roteiroTypeId: number): string {
    const roteiroType = this.roteiroTypes.find((type: any) => type.id === roteiroTypeId);
    return roteiroType ? roteiroType.type : '';
  }
}
