import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  ActivatedRoute,
  UrlTree
} from '@angular/router';
import { UsuarioService } from '../seguridad/servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalService, ABSOLUTE_PATH } from './global.service';
import { pathFromRootConcat } from './function';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Guard para validar las rutas con los workflows que estan en
 * base de datos.
 *
 * Si queremos que una ruta no este bajo esta validacion debemos
 * colocar en la data de la url el atributo `omitirPermiso:true`
 * Ejemplo:
 * ```
 * {
 *    path: 'inicio',
 *    children: [
 *       { path: '', data: { omitirPermiso: true }, component: InicioComponent, resolve: { items: RutasResolve } },
 *       { path: ':titulo/:id', data: { omitirPermiso: true }, component: InicioComponent, resolve: { items: RutasResolve } },
 *     ]
 * },
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class PermisoGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private toastrService: ToastrService,
    private usuarioService: UsuarioService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | UrlTree | Observable<boolean | UrlTree> {
    if (
      (childRoute.data && childRoute.data.omitirPermiso) ||
      childRoute.children.length !== 0
    ) {
      return true;
    } else if (!this.usuarioService.isLoggedIn) {
      return this.router.parseUrl('/seguridad/login');
    }
    return this.usuarioService.actual().pipe(
      map(usuario => {
        // Identificamos que si es el ultimo eslabón de la jerarquia
        if (childRoute.children.length === 0) {
          const path = pathFromRootConcat(childRoute.pathFromRoot);

          // Validamos con el workflow de usuario
          if (usuario && usuario.permisos) {
            const acceso = usuario.permisos.indexOf(path) > -1;
            if (!acceso) {
              this.toastrService.error(
                'No tiene permiso para acceder a esta funcionalidad',
                'Error de permisos'
              );
            } else {
              // Esta este valor es no tener que volver a calcular
              // el path absoluto de la url
              this.globalService.push(ABSOLUTE_PATH, path);
            }
            return acceso ? acceso : this.router.parseUrl('/inicio');
          } else {
            return this.router.parseUrl('/inicio');
          }
        } else {
          return true;
        }
      })
    );
  }
}
