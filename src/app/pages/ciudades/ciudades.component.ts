import { MatTableDataSource } from '@angular/material/table';
import { Ciudades } from './../../_model/Ciudades';
import { CiudadesService } from './../../_service/ciudades.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

interface Provinces {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  displayedColumns: string[] = ['idCiudad', 'nombre'];

  dataSource = new MatTableDataSource<Ciudades>();

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static : true}) sort: MatSort;

  selected = 'none';

  idDepartamento: number;

  provinces: Provinces[] = [
    {value: 5, viewValue: 'Antioquia'}
  ];
  constructor(private ciudadService: CiudadesService) { }

  ngOnInit(): void {
    this.ciudadService.listarCiudades(this.idDepartamento).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
