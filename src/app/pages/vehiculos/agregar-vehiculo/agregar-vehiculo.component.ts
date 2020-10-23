import { Vehiculos } from './../../../_model/Vehiculos';
import { VehiculosService } from './../../../_service/vehiculos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  form: FormGroup;

  constructor(private vehiculosService: VehiculosService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'placa': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3}-\[0-9]{3}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'modelo': new FormControl('2008', [Validators.required, Validators.min(2000), Validators.max(2020)]),
      // tslint:disable-next-line: object-literal-key-quotes
      'marca': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'capacidad': new FormControl('', [Validators.required]),
    });
  }

  guardar(){
    // tslint:disable-next-line: prefer-const
    let vehiculo = new Vehiculos();
    // tslint:disable-next-line: no-string-literal
    vehiculo.placa = this.form.value['placa'];
    // tslint:disable-next-line: no-string-literal
    vehiculo.modelo = this.form.value['modelo'] + '';
    // tslint:disable-next-line: no-string-literal
    vehiculo.marca = this.form.value['marca'];
    // tslint:disable-next-line: no-string-literal
    vehiculo.tipoVehiuclo = this.form.value['tipoVehiuclo'];
    // tslint:disable-next-line: no-string-literal
    vehiculo.capacidad = this.form.value['capacidad'];
    this.vehiculosService.guardar(vehiculo).subscribe(() => {
      this.openSnackBar('Vehiculo Guardado');
      this.form.reset();
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Informacion', {
      duration: 3000,
    });
  }

  get placa() {
    return this.form.get('placa');
  }

  get modelo() {
    return this.form.get('modelo');
  }

  get marca() {
    return this.form.get('marca');
  }

  get tipoVehiuclo() {
    return this.form.get('tipoVehiuclo');
  }

  get capacidad() {
    return this.form.get('capacidad');
  }
}
