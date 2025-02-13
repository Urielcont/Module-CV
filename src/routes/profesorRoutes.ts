import { Router } from "express";
import { celebrate, Joi, Segments  } from "celebrate";
import { validationProfesor } from "../validation/profesorValidation";
import { newProfesor, getProfesores } from "../controller/profesorController";
const router = Router();


// Definir rutas Para Modulo CV
/**
/**
 * @route POST /api/profesor/new
 * @desc Registrar un nuevo profesor para el curriculum
 * @access private
 * @param {string} nombre - Nombre del profesor
 * @param {string} apellido_paterno - Apellido paterno del profesor
 * @param {string} apellido_materno - Apellido materno del profesor
 * @param {string} curp - CURP del profesor (18 caracteres)
 * @param {string} matricula - Matrícula del profesor
 * @param {string} correo - Correo electrónico del profesor
 * @param {Date} fecha_nacimiento - Fecha de nacimiento del profesor (formato: DD/MM/AAAA)
 * @param {string} calle - Calle del domicilio del profesor
 * @param {string} codigo_postal - Código postal del domicilio del profesor
 * @param {string} colonia - Colonia del domicilio del profesor
 * @param {string} numero_int - Número interior del domicilio (opcional)
 * @param {string} numero_ext - Número exterior del domicilio
 * @param {string} celular - Número celular del profesor
 * @param {string} tipo_sangre - Tipo de sangre del profesor (opciones: A+, A-, B+, B-, AB+, AB-, O+, O-)
 * @param {string} resumen_profesional - Resumen profesional del profesor
 * @returns {object} 201 - Profesor registrado exitosamente
 * @returns {object} 400 - Error en los datos proporcionados
 * @returns {object} 409 - El email ya está registrado
 */
router.post(
  "/new",
  celebrate({
    [Segments.BODY]: Joi.object({
      nombre: Joi.string().min(1).max(50).required().messages(validationProfesor.nombre),
      apellido_paterno: Joi.string().min(1).max(50).required().messages(validationProfesor.apellido_paterno),
      apellido_materno: Joi.string().min(1).max(50).required().messages(validationProfesor.apellido_materno),
      correo: Joi.string().max(100).required().messages(validationProfesor.correo),
      curp: Joi.string().length(18).required().messages(validationProfesor.curp),
      matricula: Joi.string().max(20).required().messages(validationProfesor.matricula),
      fecha_nacimiento: Joi.string().max(20).optional().allow('', null).messages(validationProfesor.fecha_nacimiento), 
      calle: Joi.string().max(100).required().messages(validationProfesor.calle),
      codigo_postal: Joi.string().max(10).required().messages(validationProfesor.codigo_postal),
      colonia: Joi.string().max(20).required().messages(validationProfesor.colonia),
      numero_int: Joi.string().max(10).optional().allow('', null).messages(validationProfesor.numero_int),
      numero_ext: Joi.string().max(10).required().messages(validationProfesor.numero_ext),
      celular: Joi.string().max(10).required().messages(validationProfesor.celular),
      tipo_sangre: Joi.string().min(2).max(3).valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages(validationProfesor.tipo_sangre),
      resumen_profesional: Joi.string().max(1000).optional().allow('', null).messages(validationProfesor.resumen_profesional),
    }),
  }),
  newProfesor
);


/**
* @route GET /api/profesor/
* @desc Obtener los dato basicos de todos los profesores
* @access private

*/
router.get("/", getProfesores);

module.exports = router;

export default router;
