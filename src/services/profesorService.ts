import { conexionDB } from "../config/configDb";
import { Profesor,Certificacion, Aptitudes, Educacion, Experiencia, Idioma, Logros } from "../models/profesor";

// Verifica si el email ya está registrado
export const verificarEmail = async (email: string): Promise<boolean> => {
  const result = await conexionDB.query("SELECT id FROM profesores WHERE correo = $1", [email]);
  return result.rows.length > 0;
};

// Crea un nuevo profesor
export const crearProfesor = async (profesorData: Profesor): Promise<any> => {
  const {
    user_id,
    nombre,
    apellido_paterno,
    apellido_materno,
    correo,
    curp,
    matricula,
    fecha_nacimiento,
    calle,
    codigo_postal,
    colonia,
    numero_int,
    numero_ext,
    celular,
    tipo_sangre,
    resumen_profesional
  } = profesorData;

  // Verificar si el email ya está registrado

  // Insertar nuevo profesor
  const result = await conexionDB.query(
    `INSERT INTO profesores (
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      curp,
      matricula,
      fecha_nacimiento,
      calle,
      codigo_postal,
      colonia,
      numero_int,
      numero_ext,
      celular,
      tipo_sangre,
      resumen_profesional,
      user_id
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
    ) RETURNING *`,
    [
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      curp,
      matricula,
      fecha_nacimiento,
      calle,
      codigo_postal,
      colonia,
      numero_int || null,
      numero_ext,
      celular,
      tipo_sangre,
      resumen_profesional,
      user_id
    ]
  );

  return result.rows[0];  // Devuelve el profesor recién creado
};


// Obten todos los profesores
export const obtenerProfesores = async (): Promise<Profesor[]> => {
  const result = await conexionDB.query("SELECT * FROM profesores");
  return result.rows;
}

// Crear una nueva certificación
export const crearCertificacion = async (certificacionData: Certificacion) => {
  const { profesor_id, nombre, institucion, fecha_obtencion, archivo } = certificacionData;

  const query = `
    INSERT INTO certificaciones (id_profesor, nombre, institucion, fecha, archivo_path)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [profesor_id, nombre, institucion, fecha_obtencion, archivo || null];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
};

// Crear una nueva aptitud
export const crearAptitud = async (aptitudData: Aptitudes) => {
  const { profesor_id, aptitud, descripcion } = aptitudData;

  // Query para registrar la aptitud
  const query = `
    INSERT INTO aptitudes (id_profesor, aptitud, descripcion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [profesor_id, aptitud, descripcion || null];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
}

export const crearEducacion = async (educacionData: Educacion) => {
  const {cedula_profesional, tipo, carrera, institucion, fecha_ingreso, fecha_egreso, anotaciones, profesor_id, cedula_path } = educacionData;

  // Query para registrar valores en educacion
  const query = `
    INSERT INTO educacion (cedula_profesional, tipo, carrera, institucion, fecha_ingreso, fecha_egreso, anotaciones, id_profesor, cedula_path)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  
  const values = [cedula_profesional, tipo, carrera, institucion, fecha_ingreso, fecha_egreso, anotaciones, profesor_id, cedula_path];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
}


export const crearExperiencia = async (aptitudData: Experiencia) => {
  const {profesor_id, empresa, cargo, fecha_inicio, fecha_finalizacion, referencias, anotaciones, actual, funciones } = aptitudData;

  // Query para registrar la aptitud
  const query = `
    INSERT INTO experiencia_laboral (id_profesor, empresa, cargo, fecha_inicio, fecha_finalizacion, referencia, anotaciones, actual, funciones)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [profesor_id, empresa, cargo, fecha_inicio, fecha_finalizacion, referencias, anotaciones, actual, funciones];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
}

export const crearIdioma = async (aptitudData: Idioma) => {
  const { profesor_id, idioma, nivel, certificado } = aptitudData;

  // Query para registrar la aptitud
  const query = `
    INSERT INTO idiomas (id_profesor, idioma, nivel, certificado)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [profesor_id, idioma, nivel, certificado];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
}


export const crearLogros = async (aptitudData: Logros) => {
  const { profesor_id, nombre, institucion, fecha, tipo } = aptitudData;

  // Query para registrar la aptitud
  const query = `
    INSERT INTO logros_reconocimientos (id_profesor, nombre, institucion, fecha, tipo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [profesor_id, nombre, institucion, fecha, tipo];

  const { rows } = await conexionDB.query(query, values);
  return rows[0];
}