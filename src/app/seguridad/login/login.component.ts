import { Component, Input, OnInit } from "@angular/core";
import { UsuarioService } from "../servicios/usuario.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Usuario } from "../servicios/interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {};

  errors: any;

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.usuarioService.isLoggedIn) {
      // this.router.navigateByUrl("/inicio");
    }
    this.errors = {};
  }

  doLogin(usuario: Usuario | { nro_personal: string; password: string }) {
    this.usuarioService.login(usuario.nro_personal, usuario.password).subscribe(
      (response: any) => {
        this.errors = {};
        console.log(response);
        // this.router.navigateByUrl("/inicio");
        this.toastrService.success("Sesión iniciada con éxito");
      },
      (result: any) => {
        // if (result.error.challenge) {
        //   const challenge = result.error.challenge[0];
        //   switch (challenge) {
        //     case "CHANGE_PASSWORD":
        //       this.toastrService.warning(result.error.password[0]);
        //       this.router.navigateByUrl("/seguridad/login/nueva-contrasenna", {
        //         state: { usuario }
        //       });
        //       break;
        //     case "EXPIRED_PASSWORD":
        //       this.toastrService.error(result.error.password[0]);
        //       this.router.navigateByUrl("/seguridad/login/nueva-contrasenna", {
        //         state: { usuario }
        //       });
        //       break;
        //  }
        //   return;
        // }
        this.errors = result.error;
        this.toastrService.error("No se pudo iniciar sesión");
      }
    );
    debugger;
  }
}
