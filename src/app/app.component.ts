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

  estaON: boolean;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    const user = this.loginService.estaLogueado();
    if ( user) {
      this.estaON = true;
    }
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}

