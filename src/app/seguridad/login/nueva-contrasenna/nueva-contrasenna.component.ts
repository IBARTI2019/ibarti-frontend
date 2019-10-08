import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
// validar campos pass y confimPass de un form group
import { MatchValidator } from '../../../utils/validator';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../servicios/interface';
@Component({
  selector: 'app-nueva-contrasenna',
  templateUrl: './nueva-contrasenna.component.html',
  styleUrls: ['./nueva-contrasenna.component.css']
})
export class NuevaContrasennaComponent implements OnInit {
  public formGroupPass: FormGroup;
  myValidator = new MatchValidator();
  @Input() UserId: string; //| Usuario;
  userInform: Usuario = {};
  constructor(private userService: UsuarioService, private forms: FormBuilder, private toastrService: ToastrService) { }
  ngOnInit() {
    this.formGroupPass = this.forms.group
      (
        { validatorPass: ['', [Validators.required]], validatorConfirm: ['', [Validators.required]] });
    this.userService.getUser({ name: '_id', value: this.UserId }).subscribe((info) => {
      this.userInform = info;
      this.formGroupPass = this.forms.group
        (
          { validatorPass: ['', [Validators.required]], validatorConfirm: ['', [Validators.required]] },
          {
            validators: [this.myValidator.ControlValidator('validatorPass', 'validatorConfirm')],
          }
        );
      console.log(info);
    }, (error) => {
      this.toastrService.error(error);
    });



  }

  passSave() {
    this.userInform.last_password = this.userInform.password;
    this.userInform.password = this.formGroupPass.get('validatorPass').value;
    this.userInform.fec_mod_pass = new Date();
    this.userService.cambiarContrasenna(this.userInform).subscribe(resp => {
      this.toastrService.success('Guardado con éxito');
    }, error => {
      const errors = error.error.message;
      this.toastrService.error(errors);
    });
  }
}
