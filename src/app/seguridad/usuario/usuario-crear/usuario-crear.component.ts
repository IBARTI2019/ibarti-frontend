import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../servicios/interface';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {
  formUser: FormGroup;
  datosUser: Usuario = {};
  permisos: {
    agregar?: boolean;
    modificar?: boolean;
    eliminar?: boolean;
  };


  titulo = 'Crear Usuario';

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private ruta: Router,
    private userService: UsuarioService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.formUser = this.builder.group(
      {
        username: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required]]
      }
    );

    this.permisos = {
      agregar: true
    };
    if (this.route.snapshot.params.id) {
      this.userService.getUserId(this.route.snapshot.params.id).subscribe((resp) => {
        this.datosUser = resp;
        this.titulo = `Editar Usuario (${this.datosUser.username})`;
        // tslint:disable-next-line: forin
        Object.keys(this.formUser.value).forEach((res) => {
          this.formUser.controls[res].setValue(this.datosUser[res]);
        });
        this.permisos.modificar = true;
        this.permisos.eliminar = true;
        this.permisos.agregar = false;

      }, (error) => {
        this.toastr.error('El usuario no existe');
        this.ruta.navigate(['/seguridad/usuario/crear']);
      });
    }
  }

  saveUser() {
    Object.assign(this.datosUser, this.formUser.value);
    this.userService.add(this.datosUser).subscribe((resp) => {
      this.toastr.success('Creado exitosamente');
      this.formUser.reset();
    }, (err) => {
      this.toastr.error('Error al Guardar');
    });
  }

  updateUser() {
    Object.assign(this.datosUser, this.formUser.value);
    if (this.datosUser.id) {
      this.datosUser.updatedDate = new Date();
      this.userService.update(this.datosUser.id, this.datosUser).subscribe((resp) => {
        this.toastr.success('Modificado exitosamente');
        this.ruta.navigate(['/seguridad/usuario/crear']);
      }, (err) => {
        this.toastr.error('Error al modificar');
      });
    }
  }
  deleteUser() {
    if (this.datosUser.id) {
      this.userService.remove(this.datosUser.id).subscribe((res) => {
        this.toastr.success('Eliminado exitosamente');
        this.ruta.navigate(['/seguridad/usuario/crear']);
      }, (error) => {
        this.toastr.error('Error al eliminar');
      });
    }
  }
}
