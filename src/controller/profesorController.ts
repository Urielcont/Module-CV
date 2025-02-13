import { Request, Response } from "express";
import { verificarEmail, crearProfesor } from "../services/profesorService";


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