import { Injectable } from "@angular/core";
import { API } from "../../utils/api";
import { Permiso } from "./interface";

@Injectable({
  providedIn: "root"
})
export class PermisoService extends API<Permiso> {
  static INACTIVO = 0;
  static ACTIVO_PRIMARIO = 1;
  static ACTIVO_SECUNDARIO = 2;
  protected URL = `${this.URL_API}seguridad/permiso/`;
}
