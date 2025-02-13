import { conexionDB } from "../config/configDb";
import { Profesor,Certificacion, Aptitudes } from "../models/profesor";

// Verifica si el email ya está registrado
export const verificarEmail = async (email: string): Promise<boolean> => {
  const result = await conexionDB.query("SELECT id FROM profesores WHERE correo = $1", [email]);
  return result.rows.length > 0;
};

// Crea un nuevo profesor
export const crearProfesor = async (profesorData: Profesor): Promise<any> => {
  const {
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
      resumen_profesional
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
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
      resumen_profesional
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