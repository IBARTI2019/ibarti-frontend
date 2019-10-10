import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuario } from '../servicios/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  usuario: Usuario = {};
  verif = false;
  enviado = false;
  errors: string;

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.usuarioService.isLoggedIn) {
      // this.router.navigateByUrl('/inicio');
    }
  }

  obtenerDatosUser(user: string) {
    this.enviado = true;
    if (user !== '') {
      this.usuarioService.getUser({ name: 'username', value: user }).subscribe(info => {
        this.usuario = info;

      }, error => {
        this.toastrService.error('El usuario no existe');
        this.enviado = false;
      });
    } else {
      this.toastrService.error('El usuario no puede estar vacio');
      this.enviado = false;
    }
  }
  doLogin(usuario: Usuario | { username: string; password: string }) {
    this.usuarioService.login(this.formData.value.username, this.formData.value.password).subscribe(
      (response: any) => {
        console.log(response);
        // this.router.navigateByUrl('/inicio');
        this.toastrService.success('Sesión iniciada con éxito');
      },
      (result: any) => {
        console.log(result);
        // if (result.error.challenge) {
        //   const challenge = result.error.challenge[0];
        //   switch (challenge) {
        //     case 'CHANGE_PASSWORD':
        //       this.toastrService.warning(result.error.password[0]);
        //       this.router.navigateByUrl('/seguridad/login/nueva-contrasenna', {
        //         state: { usuario }
        //       });
        //       break;
        //     case 'EXPIRED_PASSWORD':
        //       this.toastrService.error(result.error.password[0]);
        //       this.router.navigateByUrl('/seguridad/login/nueva-contrasenna', {
        //         state: { usuario }
        //       });
        //       break;
        //  }
        //   return;
        // }
        this.errors = result.error.message;
        // console.log(this.errors);
        this.toastrService.error(this.errors);
      }
    );
    // debugger;
  }
}
