import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { componentesMaterial } from './utils/material.module';
import {
  ComponentesModule,
  entryComponentes
} from "./componentes/componentes.module";
import { SeguridadModule } from "./seguridad/seguridad.module";
import { Error401Interceptor } from "./utils/interceptor";
import { InicioComponent } from "./inicio/inicio.component";
import { environment } from "../environments/environment";
import { API } from "./utils/api";

@NgModule({
  declarations: [InicioComponent, AppComponent],
  imports: [
    componentesMaterial,
    BrowserModule,
    ComponentesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SeguridadModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => {
          return {
            whitelistedDomains: [new URL(environment.API).host],
            tokenGetter: () => localStorage.getItem(API.TOKEN)
          };
        }
      }
    }),

    ComponentesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Error401Interceptor, multi: true }
  ],
  entryComponents: [entryComponentes],
  bootstrap: [AppComponent]
})
export class AppModule { }
