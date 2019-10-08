export interface Usuario {
  id?: string;
  jwt_id?: string;
  username?: string;
  nombre?: string;
  apellido?: string;
  password?: string;
  last_password?: string;
  fec_mod_pass?: Date;
  roles?: Rol[] | string[];
  permisos?: string[];
  telefono?: string;
  ip?: string;
  email?: string;
  estado?: string;
  last_login?: Date;
  loggedIn?: boolean;
  accesToken?: string;
  confirmCode?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface Permiso {
  id?: string;
  url: string;
  descripcion: string;
  estado: number;
  utilizado: string;
}

export interface Rol {
  id?: string;
  descripcion: string;
  permisos?: Permiso[];
}

export interface ItemMenu {
  id?: string;
  nro_orden?: number;
  titulo?: string;
  subtitulo?: string[];
  icono?: string;
  permiso?: string | Permiso | any;
  es_padre?: boolean;
  comentarios?: string;
  padre?: string | ItemMenu;
  hijos?: ItemMenu[];
  estado?: number;
}
