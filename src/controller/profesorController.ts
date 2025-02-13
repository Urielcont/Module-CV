import { Request, Response } from "express";
import { verificarEmail, crearProfesor,obtenerProfesores,crearCertificacion,crearAptitud, crearEducacion, crearExperiencia, crearIdioma, crearLogros } from "../services/profesorService";
import { obtenerProfesorPorId, obtenerEducacionPorProfesor, obtenerExperienciaPorProfesor, obtenerIdiomasPorProfesor, obtenerLogrosPorProfesor, obtenerCvPorUsuario, obtenerAptitudesPorProfesor, obtenerCertificacinesPorProfesor } from "../services/profesorByIdService";

export const newProfesor = async (req: Request, res: Response): Promise<void> => {
  try {
    const profesorData = req.body;

    const correoRegistrado = await verificarEmail(profesorData.correo);
    if (correoRegistrado) {
        res.status(409).json({
        error: "El correo ya está registrado",
      });
    }

    const nuevoProfesor = await crearProfesor(profesorData);

    // Enviar respuesta con el profesor creado
     res.status(201).json({
      message: "Profesor registrado exitosamente",
      profesor: nuevoProfesor
    });
  } catch (err) {
    console.error('Error al registrar el profesor: ', err.message); 
      res.status(500).json({
      error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};

export const getProfesores = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtener los profesores
    const profesores = await obtenerProfesores();

    // Enviar respuesta con los profesores
    res.status(200).json({
      profesores});
    } catch (err) {
    console.error('Error al obtener los profesores: ', err.message); 
      res.status(500).json({
      error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};


// Agregar certificación a un profesor
export const agregarCertificacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificacionData = req.body;
    
    const nuevaCertificacion = await crearCertificacion(certificacionData);

    res.status(201).json({
      message: "Certificación registrada exitosamente",
      certificacion: nuevaCertificacion,
    });
  } catch (error) {
    console.error("Error al registrar certificación:", error);

    res.status(500).json({
      error: "Error interno al registrar la certificación. Intenta nuevamente.",
    });
  }
};

export const agregarAptitudes = async (req: Request, res: Response): Promise<void> => {
  try {
    const aptitudData = req.body;
    const nuevaAptitud = await crearAptitud(aptitudData);

    res.status(201).json({
      message: "Certificación registrada exitosamente",
      Aptitudes: nuevaAptitud,
    });
  } catch (error) {
    console.error("Error al registrar certificación:", error);

    res.status(500).json({
      error: "Error interno al registrar la certificación. Intenta nuevamente.",
    });
  }
}
export const agregarEducacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const educacionData = req.body;
    const nuevaEducacion = await crearEducacion(educacionData);

    res.status(201).json({
      message: "Educación registrada exitosamente",
      data: nuevaEducacion,
    });
  } catch (error) {
    console.error("Error al registrar Educación:", error);

    res.status(error instanceof Error ? 400 : 500).json({
      error: error instanceof Error ? error.message : "Error interno al registrar la educación. Intenta nuevamente.",
    });
  }
};

export const agregarExperiencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const experienciaData= req.body;
    const nuevaExperiencia = await crearExperiencia(experienciaData);

    res.status(201).json({
      message: "Experiencia registrada exitosamente",
      data: nuevaExperiencia,
    });
  } catch (error) {
    console.error("Error al registrar Experiencia:", error);

    res.status(error instanceof Error ? 400 : 500).json({
      error: error instanceof Error ? error.message : "Error interno al registrar la experiencia. Intenta nuevamente.",
    });
  }
};

export const agregarIdiomas = async (req: Request, res: Response): Promise<void> => {
  try {
    const idiomasData= req.body;
    const nuevoIdioma = await crearIdioma(idiomasData);

    res.status(201).json({
      message: "Idioma registrado exitosamente",
      data: nuevoIdioma,
    });
  } catch (error) {
    console.error("Error al registrar Idioma:", error);

    res.status(error instanceof Error ? 400 : 500).json({
      error: error instanceof Error ? error.message : "Error interno al registrar el idioma. Intenta nuevamente.",
    });
  }
};

export const agregarLogros = async (req: Request, res: Response): Promise<void> => {
  try {
    const logroData
     = req.body;
    const nuevoLogro = await crearLogros(logroData);

    res.status(201).json({
      message: "Logro registrado exitosamente",
      data: nuevoLogro,
    });
  } catch (error) {
    console.error("Error al registrar Logro:", error);

    res.status(error instanceof Error ? 400 : 500).json({
      error: error instanceof Error ? error.message : "Error interno al registrar el logro. Intenta nuevamente.",
    });
  }
};

export const getCvComplete = async (req: Request, res: Response): Promise<void> => {
  try {
    const { profesor_id } = req.params; // Recibir el ID del profesor

    if (!profesor_id) {
      res.status(400).json({ error: "El ID del profesor es obligatorio" });
      return;
    }

    // Convertir profesor_id a número
    const profesorIdNumber = Number(profesor_id);

    if (isNaN(profesorIdNumber)) {
      res.status(400).json({ error: "El ID del profesor debe ser un número válido" });
      return;
    }

    // Obtener información del profesor
    const profesor = await obtenerProfesorPorId(profesorIdNumber);

    if (!profesor) {
      res.status(404).json({ error: "Profesor no encontrado" });
      return;
    }

    // Obtener datos relacionados
    const aptitudes = await obtenerAptitudesPorProfesor(profesorIdNumber);
    const certificacion = await obtenerCertificacinesPorProfesor(profesorIdNumber);
    const educacion = await obtenerEducacionPorProfesor(profesorIdNumber);
    const experiencia = await obtenerExperienciaPorProfesor(profesorIdNumber);
    const idiomas = await obtenerIdiomasPorProfesor(profesorIdNumber);
    const logros = await obtenerLogrosPorProfesor(profesorIdNumber);

    // Enviar respuesta con el CV completo
    res.status(200).json({
      profesor,
      aptitudes,
      certificacion,
      educacion,
      experiencia,
      idiomas,
      logros
    });

  } catch (err) {
    console.error("Error al obtener el CV completo del profesor:", err.message);
    res.status(500).json({
      error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
    });
  }
};

export const getCvByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).json({ error: "El ID del usuario es obligatorio" });
      return;
    }

    // Obtener el CV completo de todos los profesores asociados al usuario
    const cv = await obtenerCvPorUsuario(Number(user_id));

    if (!cv || cv.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado o sin CV" });
      return;
    }

    res.status(200).json(cv);
  } catch (error) {
    console.error('Error al obtener el CV del usuario:', error);
    res.status(500).json({ error: "Error interno al procesar la solicitud" });
  }
};
