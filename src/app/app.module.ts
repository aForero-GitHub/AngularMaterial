import { environment } from './../environments/environment';
import { ErrorInterceptService } from './_shared/error-intercept.service';
import { AsociaciondialogoComponent } from './pages/vehiculos/asociaciondialogo/AsociaciondialogoComponent';
import { MaterialModule } from './_material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarVehiculoComponent } from './pages/vehiculos/agregar-vehiculo/agregar-vehiculo.component';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { Not404Component } from './pages/not404/not404.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not401Component } from './pages/not401/not401.component';

export function tokenGetter() {
  // tslint:disable-next-line: prefer-const
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}
@NgModule({
  declarations: [
    AppComponent,
    DepartamentosComponent,
    CiudadesComponent,
    VehiculosComponent,
    AgregarVehiculoComponent,
    AsociaciondialogoComponent,
    ConductoresComponent,
    PrincipalComponent,
    Not404Component,
    ErrorComponent,
    LoginComponent,
    Not401Component
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line: object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['157.230.49.177:8080'],
        blacklistedRoutes: ['http://157.230.49.177:8080/movitapp-backend-seguridad/oauth/token']
      }
    })

  ],
  entryComponents: [
    AsociaciondialogoComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
