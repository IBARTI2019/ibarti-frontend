import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../servicios/interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cambio-contrasenna',
  templateUrl: './cambio-contrasenna.component.html',
  styleUrls: ['./cambio-contrasenna.component.css']
})
export class CambioContrasennaComponent implements OnInit {
  user: Usuario = {};
  buscando: boolean = false;
  constructor(private userService: UsuarioService, private toastrService: ToastrService) { }
  ngOnInit() {
  }
  comprobarUser(usuario) {
    this.buscando = true;
    this.userService.getUser({ name: 'username', value: usuario }).subscribe((resp) => {
      this.user = resp;
      this.buscando = false;
    }, (error) => {
      switch (error.status) {
        case 404:
          this.toastrService.error('Usuario no Encontrado');
          break;
      }
      this.buscando = false;
    });
  }
}
