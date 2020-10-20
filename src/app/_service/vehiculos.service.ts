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

  listarVehiculos(page: number, size: number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  guardar(vehiculo: Vehiculos){
    return this.http.post(`${this.url}/guardar`, vehiculo);
  }
}
