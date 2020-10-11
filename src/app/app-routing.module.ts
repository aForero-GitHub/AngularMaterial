import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'provinces', component: DepartamentosComponent},
  {path: 'cities', component: CiudadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
