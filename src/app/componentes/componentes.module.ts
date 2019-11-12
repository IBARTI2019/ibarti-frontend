import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesRoutingModule } from './componentes-routing.module';
import { FormsModule } from '@angular/forms';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AccionarTableComponent } from './accionar-table/accionar-table.component';
import { componentesMaterial } from '../utils/material.module';
export const entryComponentes = [];

@NgModule({
  declarations: [NavegacionComponent, AccionarTableComponent],
  exports: [NavegacionComponent, AccionarTableComponent, componentesMaterial],
  imports: [
    componentesMaterial,
    CommonModule,
    ComponentesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: entryComponentes
})
export class ComponentesModule {
}
