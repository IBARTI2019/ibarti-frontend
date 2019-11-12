import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from '../../../componentes/accionar-table/accionar-table.component';
import { Usuario } from '../../servicios/interface';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent implements OnInit {
  data: Usuario[] = [];
  config: config;


  constructor(public serviceU: UsuarioService) { }

  ngOnInit() {

    this.serviceU.getUsers().subscribe((info: Usuario[]) => {
      this.data = info;
      this.config = {
        headers: ['index', 'username', 'nombre', 'apellido', 'email', 'telefono'],
        data: this.data,
        acciones: [{ id_accion: 0, texto: 'Agregar', enable: false }
          , { id_accion: 1, texto: 'Eliminar', enable: true }],
      };
      // this.datasource = new MatTableDataSource(info.map((val, index) => {
      //   val['index'] = index + 1;
      //   return val;
      // }));
      // this.datasource.paginator = this.paginator;
      // this.datasource.sort = this.sort;
      // this.lengthData = info.length;
      // this.headers = ['index', 'username', 'nombre', 'apellido', 'email', 'telefono'];
      // this.headerButtom = ['index', 'username', 'nombre', 'apellido', 'email', 'telefono', 'evaluar'];
      // console.log(this.datasource);
    }, error => {

    });


  }

  accionar(objeto: object) {
  console.log(objeto)
  }

}
