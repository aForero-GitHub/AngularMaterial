import { Conductores } from './../../_model/Conductores';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConductorService } from './../../_service/conductor.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  cantidad: number;
  // tslint:disable-next-line: no-inferrable-types
  pageIndex: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  pageSize: number = 9;

  displayedColumns: any[] = ['nombre', 'apellido', 'documento', 'celular', 'correo', 'ciudad', 'direccion', 'acciones'];

  dataSourceConductores = new MatTableDataSource<Conductores>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private conductoresService: ConductorService,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.conductoresService.mensajeCambio.subscribe(data => {
      this.openSnackBar(data);
      this.listarConductores();
    });
    this.listarConductores();
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarConductores();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Informacion', {
      duration: 3000,
    });
  }

 /* abrirDialog(conductor: Conductores) {
    const dialogRef = this.dialog.open(AsociaciondialogoComponent, {
      width: '400px',
      data: { nombre: conductor.nombre, idUsuario: conductor.idUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
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
*/

  listarConductores() {
    this.conductoresService.listarConductores(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceConductores = new MatTableDataSource(data.content);
      this.dataSourceConductores.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConductores.filter = filterValue.trim().toLowerCase();
  }

}
