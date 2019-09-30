import { Injectable } from '@angular/core';
import { API } from '../../utils/api';
import { Rol } from './interface';

@Injectable({
  providedIn: 'root'
})
export class RolService extends API<Rol> {
  protected URL = `${this.URL_API}seguridad/rol/`;
}
