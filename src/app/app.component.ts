import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "./seguridad/servicios/usuario.service";
import { fromEvent, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../environments/environment";

const blur$ = fromEvent(document, "blur");
const focus$ = fromEvent(document, "focus");
const mousemove$ = fromEvent(document, "mousemove");
const click$ = fromEvent(document, "click");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "ibarti-frontend";

  URL_HEALTH = "seguridad/health";
  version = {
    CLIENTE: { TAG: null, HASH: null },
    SERVIDOR: { TAG: null, HASH: null }
  };

  isLoggedIn: boolean;
  subscription: Subscription;
  token_status: any = {
    _refrescando: false,
    _ultimoRefresh: new Date(),
    _vencido: false,
    _inactivo: false
  };

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    http: HttpClient
  ) {
    // http
    //   .get(env.API + "sistema/version/")
    //   .subscribe(
    //     (data: { TAG: null; HASH: null }) => (this.version.SERVIDOR = data)
    //   );
    // http
    //   .get("assets/version.json")
    //   .subscribe(
    //     (data: { TAG: null; HASH: null }) => (this.version.CLIENTE = data)
    //   );
    // this.subscription = this.usuarioService.getUsuario.subscribe(
    //   data => (this.isLoggedIn = this.usuarioService.isLoggedIn)
    // );
  }

  ngOnInit(): void {
    // Refrescar token cada 3 min mientras la ventana del navegador este activa

    this._eventoTokenRefresh();

    blur$.subscribe(() => this._eventoTokenRefresh());
    focus$.subscribe(() => this._eventoTokenRefresh());
    mousemove$.subscribe(() => this._eventoTokenRefresh());
    click$.subscribe(() => this._eventoTokenRefresh());
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  get verHealth() {
    const usuario = this.usuarioService.getUsuario.getValue();
    return usuario && usuario.permisos
      ? usuario.permisos.indexOf(this.URL_HEALTH) > -1
      : false;
  }

  logout() {
    this.usuarioService.logout().subscribe(() => {
      this.router.navigateByUrl("/seguridad/login");
    });
  }

  _eventoTokenRefresh(): void {
    if (
      localStorage.access_token === undefined ||
      localStorage.access_token === null
    ) {
      // Comentado porque no deja acceder al cambio de contraseña
      //   this.router.navigateByUrl('/seguridad/login');
      return;
    }

    if (this.token_status._vencido) {
      return;
    }
    const fechaActual = new Date();
    if (
      this.token_status._refrescando ||
      (this.token_status._ultimoRefresh !== null &&
        fechaActual.getTime() - this.token_status._ultimoRefresh.getTime() <
          3 * 60 * 1000)
    ) {
      return;
    }
    this.token_status._refrescando = true;
    this.usuarioService
      .tokenRefresh()
      .subscribe(
        data => {
          console.log("Token refrescado con éxito");
          this.token_status._ultimoRefresh = fechaActual;
        },
        data => {
          if (data.status === 400) {
            this.token_status._vencido = true;
          }
        }
      )
      .add(() => {
        this.token_status._refrescando = false;
      });
  }
}
