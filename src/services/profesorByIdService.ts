import { conexionDB } from "../config/configDb";


export const obtenerProfesorPorId = async (profesor_id: number) => {
    try{
    const query = "SELECT * FROM profesores WHERE id = $1";
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows[0] || null;
    } catch (error) {
        console.error("Error al obtener profesor por ID:", error);
        return null;
    }
  };
  
// Obtener aptitudes por profesor
  export const obtenerAptitudesPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, aptitud, descripcion
      FROM aptitudes
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener aptitudes por profesor:", error);
        return [];
    }
  };

//   Obtener certificaciones por profesor
  export const obtenerCertificacinesPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, nombre, institucion, fecha, archivo_path
      FROM certificaciones
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener certificaciones por profesor:", error);
        return [];
    }
  };

// Obtener Educacion por profesor
  export const obtenerEducacionPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, cedula_profesional, institucion, carrera, fecha_ingreso, fecha_egreso, anotaciones, cedula_path
      FROM educacion
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener educacion por profesor:", error);
        return [];
    }
  };
  
  export const obtenerExperienciaPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, empresa, cargo, fecha_inicio, fecha_finalizacion, referencia, anotaciones, actual, funciones
      FROM experiencia_laboral
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener experiencia por profesor:", error);
        return [];
    }
  };
  
  export const obtenerIdiomasPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, idioma, nivel, certificado
      FROM idiomas
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener idiomas por profesor:", error);
        return [];
    }
  };
  
  export const obtenerLogrosPorProfesor = async (profesor_id: number) => {
    try{
    const query = `
      SELECT id, id_profesor, nombre, institucion, fecha, tipo
      FROM logros_reconocimientos
      WHERE id_profesor = $1
    `;
    const { rows } = await conexionDB.query(query, [profesor_id]);
    return rows;
    } catch (error) {
        console.error("Error al obtener logros por profesor:", error);
        return [];
    }
  };
  
  
