import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { API } from '../../utils/api';
export interface config {
  headers: string[];
  data: {
    id?: string;
  }[];
  acciones: {
    id_accion: number;
    texto: string;
    enable: boolean;
  }[];
}

@Component({
  selector: 'app-accionar-table',
  templateUrl: './accionar-table.component.html',
  styleUrls: ['./accionar-table.component.css']
})
export class AccionarTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() config: config;
  @Output() emiter = new EventEmitter<object>();

  datasource: MatTableDataSource<object>;
  headers: string[];
  headerButtom: string[];
  lengthData = 0;

  constructor() { }

  ngOnInit() {

    this.datasource = new MatTableDataSource(this.config.data.map((res, index) => {
      res['index'] = index + 1;
      return res;
    }));
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

    this.headers = this.config.headers;
    this.headerButtom = [...this.headers, 'evaluar'];
    this.lengthData = this.config.data.length;
  }

  enviarEvento(posicion: string, id: string): void {
    this.emiter.emit({
      accion: this.config.acciones[posicion].id_accion,
      data: id
    });
  }

  mostrar(e) {
    console.log(e);
  }

}
