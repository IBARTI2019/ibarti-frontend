import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuario } from '../servicios/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalRecuperarCComponent } from './modal-recuperar-c/modal-recuperar-c.component';
import { ModalRenovarCComponent } from './modal-renovar-c/modal-renovar-c.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  formD: FormGroup;
  usuario: Usuario = {};
  verif = false;
  enviado = false;
  errors: string;

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['']
    });

    this.formD = this.formBuilder.group({
      profile: ['']
    });

    if (this.usuarioService.isLoggedIn) {
      // this.router.navigateByUrl('/inicio');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalRecuperarCComponent, {
      width: '800px',
      height: '500px',
      data: {},
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  obtenerDatosUser(user: string) {
    // this.enviado = true;
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

  ///////////////////
  doLogin(usuario: Usuario | { username: string; password: string }) {
    this.usuarioService.login(this.formData.value.username, this.formData.value.password).subscribe(
      (response: any) => {
        if (response.result) {
          switch (response.result) {
            case 'FIRST_LOGIN':
              this.dialog.open(ModalRenovarCComponent, {
                width: '800px',
                height: '500px',
                data: response.data,
                disableClose: true
              });
              break;
          }
        } else {
          this.router.navigateByUrl('/inicio');
          this.toastrService.success('Sesión iniciada con éxito');
        }
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
