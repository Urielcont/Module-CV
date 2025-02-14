import { Router } from "express";
import { celebrate, Joi, Segments  } from "celebrate";
import { validationProfesor, validationCertificado,validationAptitudes } from "../validation/profesorValidation";
import { newProfesor, getProfesores, agregarCertificacion,agregarAptitudes, agregarEducacion, agregarExperiencia, agregarIdiomas, agregarLogros, getCvComplete} from "../controller/profesorController";
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
      user_id: Joi.number().integer().required(),
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


/**
* @route POST /api/profesor/certificacion
* @desc Agregar Certificación a un profesor
* @access private

*/
router.post(
  "/certificacion",
  celebrate({
    [Segments.BODY]: Joi.object({
      profesor_id: Joi.number().integer().required().messages(validationCertificado.profesor_id),
      nombre: Joi.string().max(255).required().messages(validationCertificado.nombre),
      institucion: Joi.string().max(255).required().messages(validationCertificado.institucion),
      fecha_obtencion: Joi.date().required().messages(validationCertificado.fecha_obtencion),
      archivo: Joi.string().max(255).allow(null, "").messages(validationCertificado.archivo),
    }),
  }),
  agregarCertificacion
);


/**
* @route POST /api/profesor/aptitudes
* @desc Agregar aptitudes a un profesor
* @access private

*/
router.post(
  "/aptitudes",
  celebrate({
    [Segments.BODY]: Joi.object({
      profesor_id: Joi.number().integer().required().messages(validationAptitudes.profesor_id),
      aptitud: Joi.string().max(255).required().messages(validationAptitudes.aptitud),
      descripcion: Joi.string().max(255).allow("", null).messages(validationAptitudes.descripcion),
    }),
  }),
  agregarAptitudes
);


/**
* @route POST /api/profesor/educacion
* @desc Agregar educacion de un profesor
* @access private

*/
router.post(
  "/educacion",
  celebrate({
    [Segments.BODY]: Joi.object({
      cedula_profesional: Joi.string().max(20).required(),
      tipo: Joi.string().max(255).required(),
      carrera: Joi.string().max(255).optional(),
      institucion: Joi.string().max(255).optional(),
      fecha_ingreso: Joi.date().max(new Date()).optional(),
      fecha_egreso: Joi.date().max(new Date()).optional(),
      anotaciones: Joi.string().max(255).optional(),
      profesor_id: Joi.number().integer().required(),
      cedula_path: Joi.string().max(255).optional()
    }),
  }),
  agregarEducacion
);

/**
* @route POST /api/profesor/experiencia
* @desc Agregar experiencia de un profesor
* @access private

*/
router.post(
  "/experiencia",
  celebrate({
    [Segments.BODY]: Joi.object({
      empresa: Joi.string().max(255).required(),
      cargo: Joi.string().max(255).optional(),
      fecha_inicio: Joi.date().max(new Date()).optional(),
      fecha_finalizacion: Joi.date().max(new Date()).optional(),
      referencias: Joi.string().max(255).optional(),
      anotaciones: Joi.string().max(255).optional(),
      actual: Joi.boolean().optional(),
      profesor_id: Joi.number().integer().required(),
    }),
  }),
  agregarExperiencia
);

/**
* @route POST /api/profesor/idiomas
* @desc Agregar Idiomas de un profesor
* @access private

*/
router.post(
  "/idiomas",
  celebrate({
    [Segments.BODY]: Joi.object({
      idioma: Joi.string().max(100).required(),
      nivel: Joi.string().valid("básico", "intermedio", "avanzado", "nativo").required(),
      certificado: Joi.string().max(255).optional(),
      profesor_id: Joi.number().integer().required()
    }),
  }),
  agregarIdiomas
);


/**
* @route POST /api/profesor/logros
* @desc Agregar logros de un profesor
* @access private

*/
router.post(
  "/logros",
  celebrate({
    [Segments.BODY]: Joi.object({
      nombre: Joi.string().max(255).required(),
      institucion: Joi.string().max(255).required(),
      fecha: Joi.date().max(new Date()).optional(),
      tipo: Joi.string().max(255).optional(),
      profesor_id: Joi.number().integer().required(),
    }),
  }),
  agregarLogros
);


/**
* @route GET /api/profesor/cv/id
* @desc Obtener los dato basicos de todos los profesores
* @access private

*/
router.get("/cv/:profesor_id", getCvComplete);



module.exports = router;

export default router;
