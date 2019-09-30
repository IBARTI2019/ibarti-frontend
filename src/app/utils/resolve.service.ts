import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { ItemMenu } from "../seguridad/servicios/interface";
import { Observable } from "rxjs";
import { ItemMenuService } from "../seguridad/servicios/item-menu.service";

@Injectable()
export class RutasResolve implements Resolve<ItemMenu[]> {
  constructor(private menuService: ItemMenuService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ItemMenu[] | Observable<ItemMenu[]> | Promise<ItemMenu[]> {
    // Buscamos la rutas dependiendo de la opcion de menu
    return this.menuService.rutas(route.params.id);
  }
}
