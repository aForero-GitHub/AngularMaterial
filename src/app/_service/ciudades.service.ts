import { Ciudades } from './../_model/Ciudades';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private url = `${environment.HOST}/departamentos/ciudad/listarPorDepartamnto`;

  constructor(private http: HttpClient) { }

  listarCiudades(idDepartamento: number){
    return this.http.get<Ciudades[]>(`${this.url}/${idDepartamento=5}`);
  }
}
