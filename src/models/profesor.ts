import exp from "constants";

export interface Profesor {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  curp: string;
  correo: string;
  matricula: string;
  fecha_nacimiento: Date;
  calle: string;
  codigo_postal: string;
  colonia: string;
  numero_int?: string | null; // Opcional
  numero_ext: string;
  celular: string;
  tipo_sangre: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Valores
  resumen_profesional: string;
}

export interface Certificacion {
  profesor_id: number;
  nombre: string;
  institucion: string;
  fecha_obtencion: Date;
  archivo?: string | null;
}


export interface Aptitudes {
  profesor_id: number;
  aptitud: string;
  descripcion?: string | null;
}


export interface Educacion {
  cedula_profesional: string;
  tipo:string;
  carrera: string;
  institucion: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
  anotaciones?: string | null;
  profesor_id: number;
  cedula_path: string;
}

export interface Experiencia {
  empresa: string;
  cargo: string;
  fecha_inicio: Date;
  fecha_finalizacion: Date;
  referencias: string;
  anotaciones?: string | null;
  actual: boolean;
  funciones: string;
  profesor_id: number;
}

export interface Idioma {
  idioma: string;
  nivel: string;
  certificado: string;
  profesor_id: number;
}

export interface Logros{
    nombre: string;
    institucion: string;
    fecha: Date;
    tipo: string;
    profesor_id: number;
}