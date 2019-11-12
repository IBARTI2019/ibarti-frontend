import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisoGuard } from './utils/permiso.guard';
import { RutasResolve } from './utils/resolve.service';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [PermisoGuard],
    // canActivateChild: [PermisoGuard],
    // runGuardsAndResolvers: 'always',
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        children: [
          {
            path: '',
            // data: { omitirPermiso: true },
            component: InicioComponent
            // resolve: { items: RutasResolve }
          },
          {
            path: ':titulo/:id',
            data: { omitirPermiso: true },
            component: InicioComponent,
            resolve: { items: RutasResolve }
          }
        ]
      },
      {
        path: 'seguridad',
        loadChildren: () =>
          import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
      }
    ]
  },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RutasResolve]
})
export class AppRoutingModule {}
