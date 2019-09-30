export interface Usuario {
  id?: string;
  jwt_id?: string;
  password?: string;
  nro_personal?: string;
  nombre_completo?: string;
  nombre?: string;
  apellido?: string;
  permisos?: string[];
  roles?: Rol[] | string[];
  password2?: string;
  nuevo_password?: string;
  repetir_nuevo_password?: string;
  estado?: number;
  estado_str?: string;
  last_login?: Date;
  fecha_creacion?: Date;
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
