import {
  HttpClient
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment as env} from '../../environments/environment';

/**
 * Clase abstracta para implentar funciones establecidas para
 * el CRUD de cualquier servicio, al heredar esta clase debe
 * valorizar el campo URI
 */
export abstract class API<T> {
  static TOKEN = 'access_token';
  static REFRESH_TOKEN = 'refresh_token';
  static JWT = 'jwt_id';
  protected URL_API: string = env.API;
  protected abstract URL: string;

  constructor(protected http: HttpClient) {
  }

  /**
   * Funcion que ejecuta una solicitud post para
   * Guardar el objeto
   * @param value objeto a guardar
   */
  add(value: T): Observable<T> {
    return this.http.post<T>(this.URL, value);
  }

  /**
   * Funcion que ejecuta un solicitud get y retorna un lista
   * de objeto
   * @param params parametros para el query params
   */
  list(params?: {}): Observable<T[]> {
    return this.http.get<T[]>(this.URL, {params});
  }

  /**
   * Funcion que ejecuta una solicitud get para retornar
   * un solo object
   * @param id del objeto a retornar
   * @param params query params que se pasan con la consulta get
   */
  get(id: string | number, params?: {}): Observable<T> {
    return this.http.get<T>(this.URL + id + '/', {params});
  }

  /**
   * Funcion que ejecuta una solicitud put para actualizar
   * un objeto
   *
   * @param id del objeto
   * @param value objeto con las modificaciones
   */
  update(id: string | number, value: T): Observable<T> {
    return this.http
      .put<T>(this.URL + id + '/', value);
  }

  /**
   * Funcion que ejecuta una solicitud delete para eliminar un
   * objeto
   * @param id del objeto
   */
  remove(id: string | number): Observable<T> {
    return this.http
      .delete<T>(this.URL + id + '/');
  }
}
