import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculos } from './../../../_model/Vehiculos';
import { VehiculosService } from './../../../_service/vehiculos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  private id: number;
  private edit: boolean;

  form: FormGroup;

  constructor(private vehiculosService: VehiculosService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = params['id'];
        // tslint:disable-next-line: no-string-literal
        this.edit = params['id'] != null;
    });

    this.iniciarFormulario();

    if (this.edit === true){
      this.cargarVehiculo();
    }

  }

  iniciarFormulario(){
    this.form = new FormGroup({

      // tslint:disable-next-line: object-literal-key-quotes
      'placa': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3}-\[0-9]{3}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'modelo': new FormControl('2000', [Validators.required, Validators.min(2000), Validators.max(2020)]),
      // tslint:disable-next-line: object-literal-key-quotes
      'marca': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'capacidad': new FormControl('', [Validators.required]),

    });
  }

  cargarVehiculo(){
    this.vehiculosService.listarPorId(this.id).subscribe(data => {
      // tslint:disable-next-line: quotemark
      this.form.get("placa").setValue(data.placa);
      // tslint:disable-next-line: quotemark
      this.form.get("modelo").setValue(data.modelo);
      // tslint:disable-next-line: quotemark
      this.form.get("marca").setValue(data.marca);
      // tslint:disable-next-line: quotemark
      this.form.get("tipoVehiuclo").setValue(data.tipoVehiuclo);
      // tslint:disable-next-line: quotemark
      this.form.get("capacidad").setValue(data.capacidad);
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

    if (this.edit === true){
      vehiculo.idVehiculo = this.id;
      this.vehiculosService.editar(vehiculo).subscribe(() => {
        this.form.reset();
        this.vehiculosService.mensajeCambio.next('Se ha editado el Vehiculo');
        this.router.navigate(['/vehicles']);
      });
    } else {
      this.vehiculosService.guardar(vehiculo).subscribe(() => {
        this.form.reset();
        this.vehiculosService.mensajeCambio.next('Vehiculo Guardado');
      /*}, err => {
        this.openSnackBar('Ups! No pudimos guardar el vehiculo' + err.error.error);*/
      });
    }
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
