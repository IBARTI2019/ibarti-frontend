import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Usuario } from '../../servicios/interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cambio-contrasenna',
  templateUrl: './cambio-contrasenna.component.html',
  styleUrls: ['./cambio-contrasenna.component.css']
})
export class CambioContrasennaComponent implements OnInit {
  user: Usuario = {};
  FormStepperUser: FormGroup;
  buscando = false;
  comprobado = false;
  // variables de paso siguiente
  userStep: boolean = false;



  constructor(private userService: UsuarioService, private toastrService: ToastrService, private builder: FormBuilder) { }
  ngOnInit() {
    this.FormStepperUser = this.builder.group({ user: ['', Validators.required] });
  }
  comprobar(respuesta: boolean, stepper: MatStepper) {
    if (respuesta) {
      stepper.selected.completed = true;
      stepper.next();
    }

  }
  comprobarUser(usuario: string, parameter: MatStepper) {
    if (usuario === '') {
      this.toastrService.error('El Usuario no puede ser Vacio');
    } else {
      this.buscando = true;
      this.userService.getUser({ name: 'username', value: usuario }).subscribe((resp) => {
        this.user = resp;
        this.buscando = false;
        parameter.selected.completed = true;
        parameter.next();

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
}
