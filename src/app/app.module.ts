import { MaterialModule } from './_material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DepartamentosComponent,
    CiudadesComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
