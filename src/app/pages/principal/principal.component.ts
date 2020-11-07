import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  isLogged: boolean;

  ngOnInit(): void {
    const user = this.loginService.estaLogueado();
    if ( user) {
      this.isLogged = true;
    }
  }

}
