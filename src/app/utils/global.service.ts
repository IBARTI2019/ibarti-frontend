import { Injectable } from '@angular/core';

export const ABSOLUTE_PATH = 'appAbsolutePath';

/**
 *  Servicio para guardar objectos a travez de clave valor
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  readonly map: any;
  constructor() {
    this.map = {};
  }
  /**
   * Funcion para guardar por medio de clave:valor
   * @param key  clave que identifica el valor guardado
   * @param value valor guardado
   */
  push(key: string, value: any): GlobalService {
    this.map[key] = value;
    return this;
  }

  /**
   * Funcion para retornar el valor a travez de la clave
   * @param key clave del objecto que se desea retornar
   */
  get(key: string): any {
    return this.map[key];
  }

  /**
   * Funcion para eliminar registros a travez de la clave
   * @param key clave para poder eliminar registro
   */
  delete(key: string): GlobalService {
    if (this.exists(key)) {
      delete this.map[key];
    }
    return this;
  }

  /**
   * Funcion para rectificar si existe el objecto
   * @param key clave del objecto
   */
  exists(key: string): boolean {
    return this.map.hasOwnProperty(key);
  }
}
