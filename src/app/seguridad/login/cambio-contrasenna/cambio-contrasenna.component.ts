import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
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
  @Output() listo = new EventEmitter<boolean>();
  @Input() idUser: Usuario;
  selected: number = 0;

  user: Usuario = {};
  FormStepperUser: FormGroup;


  buscando = false;
  comprobado = false;
  // variables de paso siguiente
  userStep = false;
  constructor(private userService: UsuarioService, private toastrService: ToastrService, private builder: FormBuilder) { }
  ngOnInit() {
    if (this.idUser.id) {
      this.selected = 2;
      this.user = this.idUser;
    }
    this.FormStepperUser = this.builder.group({ user: ['', Validators.required] });
  }
  comprobar(respuesta: boolean, matSteper: MatStepper) {
    if (respuesta) {
      console.log(respuesta, matSteper);
      matSteper.steps.forEach((step) => {
        step.completed = true;
        console.log(step);
      });
      matSteper.next();
    }

  }
  comprobarUser(usuario: string, matSteper: MatStepper) {
    if (usuario === '') {
      this.toastrService.error('El Usuario no puede ser Vacio');
    } else {
      this.buscando = true;
      this.userService.getUser({ name: 'username', value: usuario }).subscribe((resp) => {
        this.user = resp;
        this.buscando = false;
        matSteper.selected.completed = true;
        matSteper.next();

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
  guardado() {
    this.listo.emit(true);
  }
}
