import { VehiculosService } from './../../_service/vehiculos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  cantidad: number;
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: any[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad'];

  dataSourceVehiculos = new MatTableDataSource<any>();

  @ViewChild(MatSort, {static : true}) sort: MatSort;

  constructor(private vehiculosService: VehiculosService) { }

  ngOnInit(): void {
    this.listarVehiculos();
  }

  cambiarPagina(e: any){
    this.pageIndex = e.paeIndex;
    this.pageSize = e.pageSize;
    this.listarVehiculos();
  }

  listarVehiculos(){
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
