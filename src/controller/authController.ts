import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fetchGetUserByEmail, crearUsuario } from '../services/authService';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro'; // Usa variables de entorno

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son obligatorios' });
      return;
    }

    const user = await fetchGetUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Verificar si el usuario tiene status activo
    if (user.status === false) {
      res.status(403).json({ message: 'Usuario inhabilitado, contacta al administrador' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    // No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: 'Login exitoso', token, user: userWithoutPassword });
  } catch (error) {
    console.error('Error al hacer login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password} = req.body;
  
      // Verificar si el email ya está registrado
      // Esto debe ser hecho en el servicio o directamente en el controlador
      const usuarioExistente = await fetchGetUserByEmail(email);
      if (usuarioExistente) {
        res.status(400).json({ error: "El correo electrónico ya está registrado." });
        return;
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      const role = 'user'
      // Crear el usuario
      const nuevoUsuario = await crearUsuario(email, hashedPassword, role);
  
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        usuario: {
          email: nuevoUsuario.email,
          role: nuevoUsuario.role,
        },
      });
    } catch (err) {
      console.error("Error al registrar el usuario:", err.message);
      res.status(500).json({
        error: "Error interno al procesar la solicitud. Intenta nuevamente más tarde.",
      });
    }
  };