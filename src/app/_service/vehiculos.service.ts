import { AsociarCV } from './../_model/AsociarCV';
import { Vehiculos } from './../_model/Vehiculos';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private url = `${environment.HOST}/vehiculos`;

  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarVehiculos(page: number, size: number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  listarPorId(idVehiculo: number){
    return this.http.get<Vehiculos>(`${this.url}/listar/${idVehiculo}`);
  }

  guardar(vehiculo: Vehiculos){
    return this.http.post(`${this.url}/guardar`, vehiculo);
  }

  editar(vehiculo: Vehiculos){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }

  /*AsociarConductor(asociacion: AsociarCV) {​​
    return this.http.post(`${​​this.url}​​/asociarcondcutor/${​​asociacion.idUsuario}​​/${​​asociacion.idVehiculo}​​`, asociacion);
  }​​

  desasociarConductor(desasociar: AsociarCV) {​​
    return this.http.post(`${​​this.url}​​/desasociarconductor/${​​desasociar.idUsuario}​​/${​​desasociar.idVehiculo}​​`, desasociar);
  }​​*/

  asociarConductor(asociacion: AsociarCV){
    return this.http.post(`${this.url}/asociarcondcutor/${asociacion.idUsuario}/${asociacion.idVehiculo}`, asociacion);
  }

  desasociarConductor(desasociar: AsociarCV){
    return this.http.post(`${this.url}/desasociarconductor/${desasociar.idUsuario}/${desasociar.idVehiculo}`, desasociar);
  }

}
