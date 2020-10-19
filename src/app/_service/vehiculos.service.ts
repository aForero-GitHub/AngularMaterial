import { Vehiculos } from './../_model/Vehiculos';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private url = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient) { }

  listarPaginado(page: number, size: number){
    return this.http.get<Vehiculos[]>(`${this.url}/pageable?page=${page}&size=${size}`);
  }
}
