import { MatTableDataSource } from '@angular/material/table';
import { Ciudades } from './../../_model/Ciudades';
import { CiudadesService } from './../../_service/ciudades.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  selectedValue: any;
  dataSource: any[];
  idDepartamento: number;

  displayedColumns: any[] = ['idCiudad', 'nombre'];

  dataSourceCiudades = new MatTableDataSource<Ciudades>();

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static : true}) sort: MatSort;

  constructor(private ciudadService: CiudadesService) { }

  idDepar(event){
    this.selectedValue = event.idDepartamento;
    this.ciudadService.listarCiudades(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudades = new MatTableDataSource(data);
      this.dataSourceCiudades.paginator = this.paginator;
      this.dataSourceCiudades.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.ciudadService.listar().subscribe(data => {
      this.dataSource = data;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCiudades.filter = filterValue.trim().toLowerCase();
  }

}
