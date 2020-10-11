import { Departamentos } from './../../_model/Departamentos';
import { DepartamentoService } from './../../_service/departamentos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  displayedColumns: string[] = ['idDepartamento', 'nombre'];

  dataSource = new MatTableDataSource<Departamentos>();

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static : true}) sort: MatSort;

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.departamentoService.listar().subscribe(data => {
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
