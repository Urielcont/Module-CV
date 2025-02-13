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