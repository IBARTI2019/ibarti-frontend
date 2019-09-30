import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { UsuarioService } from '../seguridad/servicios/usuario.service';
import { Router } from '@angular/router';


@Injectable()
export class Error401Interceptor implements HttpInterceptor {
    constructor(private usuarioService: UsuarioService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 0) {
                this.usuarioService.logout().subscribe(() => {
                    this.router.navigateByUrl('/seguridad/login');
                });
            }
            return throwError(err);
        }));
    }
}
