import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasenia: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasenia)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content.Type', 'application/x-www-form-urlencoded; charset=UFT-8')
        .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }
}
