import { environment } from './../../environments/environment';
import { LoginService } from './../_service/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
              private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const helper = new JwtHelperService();
    const rpta = this.loginService.estaLogueado();

    if (rpta) {
      // tslint:disable-next-line: prefer-const
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)) {

        const url = state.url;
        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];

        if (url.includes('/provinces') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('/vehicles') && rol === 'Despachador') {
          return true;
        }
        else if (url.includes('/cities') && rol === 'Administrador') {
          return true;
        }
        else if (url.includes('/drivers') && rol === 'Administrador') {
          return true;
        }
        this.router.navigate(['not-401']);
        return false;
      } else {
        this.loginService.cerrarSesion();
        return false;
      }
    } else {
      this.router.navigate(['not-401']);
      return false;
    }
  }
}
