import { Vehiculos } from './../../../_model/Vehiculos';
import { VehiculosService } from './../../../_service/vehiculos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  form: FormGroup;

  placa: string;
  modelo: string;
  marca: string;
  tipoVehiculo: string;
  capacidad: string;

  constructor(private vehiculosService: VehiculosService) { }

  ngOnInit(): void {
  }

  guardar(){
    const vehiculo = new Vehiculos();
    vehiculo.placa = this.placa;
    vehiculo.modelo = this.modelo + '';
    vehiculo.marca = this.marca;
    vehiculo.tipoVehiuclo = this.tipoVehiculo;
    vehiculo.capacidad = this.capacidad;
    this.vehiculosService.guardar(vehiculo).subscribe(() => {
      //
    });
  }
}
