import { Router } from '@angular/router';
import { LoginService } from './_service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asgular-material';

  constructor(private loginService: LoginService,
              private router: Router){}

  isLogged: boolean;

  ngOnInit(): void {
    const user = this.loginService.estaLogueado();
    if (user) {
      this.isLogged = true;
    }
    this.cerrarSesion();
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}

