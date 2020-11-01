import { AgregarConductoresComponent } from './pages/conductores/agregar-conductores/agregar-conductores.component';
import { Not401Component } from './pages/not401/not401.component';
import { GuardService } from './_shared/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { Not404Component } from './pages/not404/not404.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { AgregarVehiculoComponent } from './pages/vehiculos/agregar-vehiculo/agregar-vehiculo.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'provinces', component: DepartamentosComponent, canActivate: [GuardService]},
  {path: 'cities', component: CiudadesComponent, canActivate: [GuardService]},
  {path: 'drivers', component: ConductoresComponent, children : [
    {path: 'add', component: AgregarConductoresComponent},
    {path: 'edit/:id', component: AgregarConductoresComponent}
  ], canActivate: [GuardService]},
  {path: 'vehicles', component: VehiculosComponent, children : [
    {path: 'add', component: AgregarVehiculoComponent},
    {path: 'edit/:id', component: AgregarVehiculoComponent}
  ], canActivate: [GuardService]},
  {path: '', component: PrincipalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error/:status/:message', component: ErrorComponent},
  {path: 'not-401', component: Not401Component},
  {path: '**', component: Not404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
