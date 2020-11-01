import { Vehiculos } from './../../_model/Vehiculos';
import { AsociaciondialogoComponent } from './asociaciondialogo/AsociaciondialogoComponent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiculosService } from './../../_service/vehiculos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  cantidad: number;
  // tslint:disable-next-line: no-inferrable-types
  pageIndex: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  pageSize: number = 9;

  displayedColumns: any[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'acciones'];

  dataSourceVehiculos = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private vehiculosService: VehiculosService,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.vehiculosService.mensajeCambio.subscribe(data => {
      this.openSnackBar(data);
      this.listarVehiculos();
    });
    this.listarVehiculos();
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarVehiculos();
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Informacion', {
      duration: 3000,
    });
  }

  abrirDialogo(vehiculo: Vehiculos){
    const dialogoRef = this.dialog.open(AsociaciondialogoComponent, {
      width: '400px',
      // tslint:disable-next-line: object-literal-shorthand
      data: { placa: vehiculo.placa, idVehiculo: vehiculo.idVehiculo }
    });

    dialogoRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.event === 'Elimino') {
          console.log('Elimino');
          console.log(result.data);
        } else if (result.event === 'Cancel') {
          console.log('Cancel');
        }
      }
    });
  }

  listarVehiculos() {
    this.vehiculosService.listarVehiculos(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceVehiculos = new MatTableDataSource(data.content);
      this.dataSourceVehiculos.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVehiculos.filter = filterValue.trim().toLowerCase();
  }

}
