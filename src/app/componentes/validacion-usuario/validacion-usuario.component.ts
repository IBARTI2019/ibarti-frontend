import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UsuarioService } from '../../seguridad/servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-validacion-usuario',
  templateUrl: './validacion-usuario.component.html',
  styleUrls: ['./validacion-usuario.component.css']
})
export class ValidacionUsuarioComponent {
  @Input() metodo: object;
  @Output() comprobacion = new EventEmitter<boolean>();
  code = '';
  datoMetodo = '';
  buscando = false;
  codigo: string;
  constructor(private userService: UsuarioService, private toastrService: ToastrService) { }

  generarCode(leng: number): string {
    const arr: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V ', 'W', 'X', 'Y', 'Z',
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let palabra = '';
    for (let i = 0; i < leng; i++) {
      const index = Math.round(Math.random() * (arr.length - 1));
      palabra += arr[index];
    }
    return palabra.replace(' ', '');
  }
  SendCode(metodo: string) {

    this.datoMetodo = metodo;
    this.buscando = true;
    switch (metodo) {

      case 'email':
        if (this.metodo[metodo]) {
          this.code = this.generarCode(20);
          const config = {
            to: this.metodo[metodo],
            subject: 'IBARTI SOFTWARE',
            text: 'Su codigo de Recuperacion es: ' + this.code,
            html: ''
          };
          this.userService.sendMail(config).subscribe(info => {
            this.toastrService.success('Se ha enviado con Exito');
            this.buscando = false;
            this.codigo = '';
          }, error => {
            this.toastrService.error(error);
            this.buscando = false;
          });
        } else {
          this.toastrService.error('Usted no posee ' + metodo);
          this.buscando = false;
        }
        break;
      case 'telefono':
        if (this.metodo[metodo]) {
          this.code = this.generarCode(20);
        } else {
          this.toastrService.error('Usted no posee ' + metodo);
          this.buscando = false;
        }
        break;
    }
  }
  validCode(text: string) {
    if (text === this.code) {
      this.toastrService.success('Su codigo Fue validado');
      this.comprobacion.emit(true);
    } else {
      this.toastrService.error('Su codigo es Invalido');
    }
  }

}
