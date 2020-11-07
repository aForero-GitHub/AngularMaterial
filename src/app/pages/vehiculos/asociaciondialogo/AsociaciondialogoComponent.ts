import { AsociarCV } from './../../../_model/AsociarCV';
import { VehiculosService } from './../../../_service/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ConductorService } from './../../../_service/conductor.service';
import { Conductores } from './../../../_model/Conductores';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculos } from './../../../_model/Vehiculos';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-asociaciondialogo',
    templateUrl: './asociaciondialogo.component.html',
    styleUrls: ['./asociaciondialogo.component.css']
})
export class AsociaciondialogoComponent implements OnInit {
    idVehiculo: number;
    idUsuario: number;
    selectedValue: any;
    dataSource: any[];
    dataSourceSelect: any[];
    private id: any;
    vehiculo: Vehiculos;

    ids: number;
    displayedColumns: any[] = ['nombre', 'apellido', 'documento', 'acciones'];
    dataSourceConductores = new MatTableDataSource<Conductores>();

    constructor(public dialogRef: MatDialogRef<AsociaciondialogoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vehiculos,
                private conductorService: ConductorService,
                private route: ActivatedRoute,
                private vehiloService: VehiculosService) {}

    ngOnInit(): void {
      this.idVehiculo = this.data.idVehiculo;
      this.cargarDatosTabla();
      this.listaNoAsociados();
    }

    cargarDatosTabla(){
      this.conductorService.conductoresAsociados(this.idVehiculo).subscribe(res => {
        this.dataSourceConductores = new MatTableDataSource(res);
      });
    }

    listaNoAsociados(){
      this.conductorService.conductoresNoAsociados(this.idVehiculo).subscribe(data => {
        this.dataSourceSelect = data;
      });
    }
    idSelect(event){
      this.selectedValue = event.idUsuario;
    }

    Asociar(){
      // tslint:disable-next-line: prefer-const
      let asociacion = new AsociarCV();
      asociacion.idUsuario = this.idUsuario;
      asociacion.idVehiculo = this.data.idVehiculo;
      this.vehiloService.asociarConductor( asociacion).subscribe(() => {
        this.vehiloService.mensajeCambio.next('Se ha agregado cond');
        this.cargarDatosTabla();
        this.listaNoAsociados();
      });
    }

    desasociar(idUser: number) {​​
      // tslint:disable-next-line: prefer-const
      let desasociar = new AsociarCV();
      desasociar.idUsuario = idUser;
      desasociar.idVehiculo = this.data.idVehiculo;
      this.vehiloService.desasociarConductor(desasociar).subscribe(() => {​​
        this.vehiloService.mensajeCambio.next('Se ha eliminado el conductor de este vehiculo');
        this.cargarDatosTabla();
        this.listaNoAsociados();
      }​​);
    }​​

    cerrarDialogo(){
      this.dialogRef.close({event: 'Cancelo'});
    }
  }
