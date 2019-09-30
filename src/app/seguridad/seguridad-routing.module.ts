import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {LoginComponent} from './login/login.component';
import {NuevaContrasennaComponent} from './login/nueva-contrasenna/nueva-contrasenna.component';
import {UsuarioCrearComponent} from './usuario/usuario-crear/usuario-crear.component';
import {CambioContrasennaComponent} from './login/cambio-contrasenna/cambio-contrasenna.component';
import {UsuarioEditarComponent} from './usuario/usuario-editar/usuario-editar.component';

const routes: Routes = [
  {
    path: 'login',
    data: {omitirPermiso: true},
    children: [
      {path: '', component: LoginComponent},
      {
        path: 'nueva-contrasenna',
        data: {omitirPermiso: true},
        component: NuevaContrasennaComponent
      },
      {
        path: 'cambio-contrasenna',
        data: {omitirPermiso: true},
        component: CambioContrasennaComponent
      }
    ]
  },
  {
    path: 'usuario',
    data: {
      breadcrumb: 'Lista'
    },
    children: [
      {path: '', component: UsuarioComponent},
      {path: 'crear', component: UsuarioCrearComponent},
      {path: 'editar/:id', component: UsuarioEditarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule {
}
