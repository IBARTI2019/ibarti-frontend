import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuario/usuario.component';
import { NuevaContrasennaComponent } from './login/nueva-contrasenna/nueva-contrasenna.component';
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
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { PermisoCrearComponent } from './permiso/permiso-crear/permiso-crear.component';
import { PermisoComponent } from './permiso/permiso.component';


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
    PermisoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    SeguridadRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class SeguridadModule { }
