import { PrincipalComponent } from './pages/principal/principal.component';
import { ConductoresComponent } from './pages/conductores/conductores.component';
import { AgregarVehiculoComponent } from './pages/vehiculos/agregar-vehiculo/agregar-vehiculo.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'provinces', component: DepartamentosComponent},
  {path: 'cities', component: CiudadesComponent},
  {path: 'vehicles', component: VehiculosComponent, children : [
    {path: 'add', component: AgregarVehiculoComponent},
    {path: 'edit/:id', component: AgregarVehiculoComponent}
  ] },
  {path: 'drivers', component: ConductoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
