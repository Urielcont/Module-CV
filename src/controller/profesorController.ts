import { Request, Response } from "express";
import { verificarEmail, crearProfesor,obtenerProfesores,crearCertificacion } from "../services/profesorService";


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