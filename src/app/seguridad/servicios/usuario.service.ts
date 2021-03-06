import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../../utils/api";
import { Usuario } from "./interface";
import { map, catchError, publishReplay, refCount } from "rxjs/operators";
import { Observable, Observer, BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class UsuarioService extends API<Usuario> {
  protected URL = `${this.URL_API}seguridad/usuario/`;
  private usuario_actual: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  private $actual: Observable<Usuario>;

  // public isLoggedIn = false;

  constructor(
    protected http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    super(http);
  }

  public login(nro_personal: string, password: string) {
    // En el login se quitan los ceros a la izquierda para números de personal
    return this.http
      .post(`${this.URL}authenticate`, {
        nro_personal,
        password
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem(API.TOKEN, response.token);
          localStorage.setItem(API.REFRESH_TOKEN, response.token);
          this.actual().subscribe();
          return response;
        })
      );
  }

  public activar(id: string) {
    return this.http.patch(this.URL + id + "/activar/", {});
  }

  public get getUsuario(): BehaviorSubject<Usuario> {
    return this.usuario_actual;
  }

  public actual() {
    if (this.$actual) {
      return this.$actual;
    }
    this.$actual = this.http.get(`${this.URL}actual/`).pipe(
      publishReplay(),
      refCount(),
      map((response: any) => {
        localStorage.setItem(API.JWT, response.jwt_id);
        this.usuario_actual.next(response);
        return response;
      })
    );
    return this.$actual;
  }

  public logout() {
    return new Observable<void>((observe: Observer<void>) => {
      localStorage.removeItem(API.TOKEN);
      localStorage.removeItem(API.REFRESH_TOKEN);
      localStorage.removeItem(API.JWT);
      this.usuario_actual.next(null);
      observe.next();
      observe.complete();
    });
  }

  get isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired();
  }

  public valNroPersonal(nro_personal: any) {
    // tslint:disable-next-line: radix
    return !isNaN(nro_personal) ? "" + parseInt(nro_personal) : nro_personal;
  }

  public cambiarContrasenna(usuario: Usuario) {
    return this.http.post(`${this.URL}cambiar_contrasenna/`, usuario);
  }

  tokenRefresh() {
    return this.http
      .post(`${this.URL}token-refresh/`, {
        refresh: localStorage.getItem(API.REFRESH_TOKEN)
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem(API.TOKEN, response.access);
          return response;
        })
      );
  }
}
