import { AsociaciondialogoComponent } from './pages/vehiculos/asociaciondialogo/AsociaciondialogoComponent';
import { MaterialModule } from './_material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarVehiculoComponent } from './pages/vehiculos/agregar-vehiculo/agregar-vehiculo.component';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartamentosComponent,
    CiudadesComponent,
    VehiculosComponent,
    AgregarVehiculoComponent,
    AsociaciondialogoComponent,
    ConductoresComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    AsociaciondialogoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
