import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario/usuario.component';
import { NuevaContrasennaComponent } from '../componentes/nueva-contrasenna/nueva-contrasenna.component';
import { LoginComponent } from './login/login.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { UsuarioCrearComponent } from './usuario/usuario-crear/usuario-crear.component';
import { CambioContrasennaComponent } from './login/cambio-contrasenna/cambio-contrasenna.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { RolEditarComponent } from './rol/rol-editar/rol-editar.component';
import { RolCrearComponent } from './rol/rol-crear/rol-crear.component';
import { RolComponent } from './rol/rol.component';
import { componentesMaterial } from '../utils/material.module';
import { PermisoCrearComponent } from './permiso/permiso-crear/permiso-crear.component';
import { PermisoComponent } from './permiso/permiso.component';
import { ValidacionUsuarioComponent } from '../componentes/validacion-usuario/validacion-usuario.component';
import { ModalRecuperarCComponent } from './login/modal-recuperar-c/modal-recuperar-c.component';
import { ModalRenovarCComponent } from './login/modal-renovar-c/modal-renovar-c.component';
import { ListadoUsuarioComponent } from './usuario/listado-usuario/listado-usuario.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    LoginComponent,
    NuevaContrasennaComponent,
    UsuarioCrearComponent,
    CambioContrasennaComponent,
    UsuarioEditarComponent,
    ItemMenuComponent,
    RolEditarComponent,
    RolCrearComponent,
    RolComponent,
    PermisoCrearComponent,
    PermisoComponent,
    ValidacionUsuarioComponent,
    ModalRecuperarCComponent,
    ModalRenovarCComponent,
    ListadoUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    SeguridadRoutingModule,
    componentesMaterial
  ],
  entryComponents: [ModalRecuperarCComponent, ModalRenovarCComponent]
})
export class SeguridadModule { }
