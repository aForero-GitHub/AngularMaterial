import { DepartamentoService } from './../../_service/departamentos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.departamentoService.listar();
  }

}
