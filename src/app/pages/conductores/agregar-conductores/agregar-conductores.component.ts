import { Rol } from './../../../_model/Rol';
import { TipoDocumento } from './../../../_model/TipoDocumento';
import { Departamentos } from './../../../_model/Departamentos';
import { DepartamentoService } from './../../../_service/departamentos.service';
import { CiudadesService } from './../../../_service/ciudades.service';
import { Ciudades } from './../../../_model/Ciudades';
import { Conductores } from './../../../_model/Conductores';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConductorService } from './../../../_service/conductor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-conductores',
  templateUrl: './agregar-conductores.component.html',
  styleUrls: ['./agregar-conductores.component.css']
})
export class AgregarConductoresComponent implements OnInit {

  dataSourceCiudades: any;
  dataSourceDepartamentos: Departamentos[];
  selectedValue: any;
  public id: number;
  public edit: boolean;
  idDepartamento: number;
  idCiudad: number;
  ciudades: Ciudades;

  form: FormGroup;

  constructor(private conductorService: ConductorService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private ciudadesService: CiudadesService,
              private departamentosService: DepartamentoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      // tslint:disable-next-line: no-string-literal
      this.edit = params['id'] != null;
    });
    this.iniciarFormulario();
    this.departamentosService.listar().subscribe(data => {
      this.dataSourceDepartamentos = data;
    });
  }

  iniciarFormulario(){
    this.form = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'documento': new FormControl('', [Validators.required, Validators.pattern('[0-9]{6,10}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'nombre': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2,10}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'apellido': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2,10}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'nick': new FormControl('', [Validators.required]),
       // tslint:disable-next-line: object-literal-key-quotes
      'clave': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'direccion': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'celular': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'celularAux': new FormControl('', [Validators.pattern('[0-9]{1,10}')]),
      // tslint:disable-next-line: object-literal-key-quotes
      'correo': new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
    });
  }

  cargarConductor(){
    this.conductorService.listarPorId(this.id).subscribe(data => {
      // tslint:disable-next-line: quotemark
      this.form.get("nombre").setValue(data.nombre);
      // tslint:disable-next-line: quotemark
      this.form.get("apellido").setValue(data.apellido);
      // tslint:disable-next-line: quotemark
      this.form.get("documento").setValue(data.documento);
      // tslint:disable-next-line: quotemark
      this.form.get("nick").setValue(data.nick);
      // tslint:disable-next-line: quotemark
      this.form.get("clave").setValue(data.clave);
      // tslint:disable-next-line: quotemark
      this.form.get("direccion").setValue(data.direccion);
      // tslint:disable-next-line: quotemark
      this.form.get("celular").setValue(data.celular);
      // tslint:disable-next-line: quotemark
      this.form.get("celularAux").setValue(data.celularAux);
      // tslint:disable-next-line: quotemark
      this.form.get("correo").setValue(data.correo);
    });
  }

  guardar(){
    // tslint:disable-next-line: prefer-const
    let conductor = new Conductores();
    // tslint:disable-next-line: no-string-literal
    conductor.documento = this.form.value['documento'];
    // tslint:disable-next-line: no-string-literal
    conductor.nombre = this.form.value['nombre'];
    // tslint:disable-next-line: no-string-literal
    conductor.apellido = this.form.value['apellido'];
    // tslint:disable-next-line: no-string-literal
    conductor.nick = this.form.value['nick'];
    // tslint:disable-next-line: no-string-literal
    conductor.clave = this.form.value['clave'];
    // tslint:disable-next-line: no-string-literal
    conductor.direccion = this.form.value['direccion'];
    // tslint:disable-next-line: no-string-literal
    conductor.celular = this.form.value['celular'];
    // tslint:disable-next-line: no-string-literal
    conductor.celularAux = this.form.value['celularAux'];
    // tslint:disable-next-line: no-string-literal
    conductor.correo = this.form.value['correo'];
    // tslint:disable-next-line: prefer-const
    let tipoDocumento = new TipoDocumento();
    conductor.tipoDocumento = tipoDocumento;
    // tslint:disable-next-line: prefer-const
    let rol = new Rol();
    conductor.rol = rol;
    // tslint:disable-next-line: no-string-literal
    conductor.ciudad = this.form.value['ciudadSelct'];

    if (this.edit === true ){
      conductor.idUsuario = this.id;
      this.conductorService.editarConductor(conductor).subscribe(() => {
        this.form.reset();
        this.conductorService.mensajeCambio.next('Se han hecho cambios a un conductor');
        this.router.navigate(['/drivers']);
      });
    } else {
      this.conductorService.guardarConductor(conductor).subscribe(() => {
        this.form.reset();
        this.conductorService.mensajeCambio.next('Se han agregado un conductor');
      });
    }
  }

  idDepar(event){
    this.selectedValue = event.idDepartamento;
    this.ciudadesService.listarCiudades(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudades = data;
    });
  }

  idCiu(event){
    this.selectedValue = event.idCiudad;
    this.ciudades.idCiudad = event.idCiudad;
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Informacion', {
      duration: 3000,
    });
  }

  get documento() {
    return this.form.get('documento');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get nick() {
    return this.form.get('nick');
  }

  get clave() {
    return this.form.get('clave');
  }

  get direccion() {
    return this.form.get('direccion');
  }

  get celular() {
    return this.form.get('celular');
  }

  get celularAux() {
    return this.form.get('celularAux');
  }

  get correo() {
    return this.form.get('correo');
  }

}
