import { Departamentos } from './../_model/Departamentos';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = `${environment.HOST}/departamentos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Departamentos[]>(`${this.url}/listar`);
  }
}
