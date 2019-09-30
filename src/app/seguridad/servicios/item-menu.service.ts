import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { API } from "../../utils/api";
import { ItemMenu } from "./interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemMenuService extends API<ItemMenu> {
  protected URL = `${this.URL_API}seguridad/menu/`;

  constructor(protected http: HttpClient) {
    super(http);
  }
  /**
   * Funcion que hace una solicitud get para obtener las opciones
   * de menu
   * @param menu_id id de la opcion padre del menu
   */
  public rutas(menu_id?: string): Observable<ItemMenu[]> {
    let params: any;
    if (menu_id) {
      params = {
        menu: menu_id
      };
    }
    return this.http.get<ItemMenu[]>(`${this.URL}rutas/`, { params });
  }

  /**
   * Funcion que realiza una solicitud get para retornar la opcion de menu
   * desde una url del workflow
   * @param url de la opcion de menu
   */
  public permiso(url: string): Observable<any> {
    return this.http.get<ItemMenu[]>(`${this.URL}permiso/`, {
      params: { url }
    });
  }

  public add(value: ItemMenu): Observable<ItemMenu> {
    throw new Error("Utilice la funcion save");
  }

  /**
   * Funcion que realiza una solicitud post para guardar el menu completo
   * @param values Lista de `Menu`
   */
  public save(menus: ItemMenu[]) {
    return this.http.post(this.URL, { menus });
  }

  /**
   * Funcion que realiza una solicitud para importar el menu
   */
  public importar(file: File): Observable<any> {
    const form = new FormData();
    form.append("file", file);
    return this.http.post(`${this.URL}importar/`, form);
  }
}
