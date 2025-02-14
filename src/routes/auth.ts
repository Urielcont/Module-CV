import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { login, registrarUsuario } from "../controller/authController";
const router = Router();

// Definir rutas Para autebticacion

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesion
 * @access private
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {object} 201 - Login exitoso
 * @returns {object} 404 - Usuario no encontrado
 * @returns {object} 401 - Contraseña incorrecta
 * @returns {object} 500 - Error al Agregar el usuario
*/
router.post(
    '/login',
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .max(32)
          .required()
          .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]*$')),
      }),
    }),
    login
  );

/**
 * @route POST /api/auth/register
 * @desc Registrar un nuevo usuario
 * @access private
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
*/
  // Validación y ruta para registrar un usuario
router.post(
    "/register",
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().required().messages({
          "string.empty": "El correo electrónico es obligatorio",
          "string.email": "El correo electrónico no es válido",
        }),
        password: Joi.string().min(6).required().messages({
          "string.empty": "La contraseña es obligatoria",
          "string.min": "La contraseña debe tener al menos 6 caracteres",
        }),
      }),
    }),
    registrarUsuario
  );
module.exports = router;

export default router;
