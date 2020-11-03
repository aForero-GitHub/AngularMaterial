import { Conductores } from './../_model/Conductores';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private url = `${environment.HOST}/usuarios`;

  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarConductores(page: number, size: number){
    return this.http.get<any>(`${this.url}/pageablePorRol/4/${page}/${size}`);
  }

  listarPorId(idConductor: number){
    return this.http.get<any>(`${this.url}/listar/${idConductor}`);
  }

  guardarConductor(conductor: Conductores){
    return this.http.post(`${this.url}/guardar`, conductor);
  }

  editarConductor(conductor: Conductores){
    return this.http.put(`${this.url}/editar`, conductor);
  }

  eliminarConductor(idConductor: number){
    return this.http.delete<Conductores>(`${this.url}/eliminar/${idConductor}`);
  }
}
